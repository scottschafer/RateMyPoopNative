import { makeAutoObservable, runInAction } from 'mobx';
import { initFirebase, isNameAvailable } from './firebase';
import { generateName } from './utils/nameGenerator';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { LocationAccuracy } from 'expo-location';
import { calcDistance } from './utils/calcDistance';
import { PoopSchema } from './types/poopSchema';
import firebase from 'firebase/app';

export type UserProfileSchema = {
  name: string;
}


export const Mode = {
  showingMap: 0,
  ratingPoop: 1,
  editProfile: 2
}

type NameAndAvailability = {
  name: string;
  available?: true | false | 'testing';
};

class Store {
  poops: Array<PoopSchema> = [];
  currentLocation: { lat: number, lng: number } = { lat: 0, lng: 0 };
  gettingLocation: boolean = true;
  rating: PoopSchema['rating'] = { size: 0, consistency: 0 };
  username: string = '';

  showingRegisterPoop = false;

  // center: google.maps.LatLngLiteral | null = null;
  // zoom: number = 3;

  mode = Mode.editProfile;

  newProfileNames: Array<NameAndAvailability> = [];

  storage = new Storage({
    // maximum capacity, default 1000 key-ids
    size: 1000,

    // Use AsyncStorage for RN apps, or window.localStorage for web apps.
    // If storageBackend is not set, data will be lost after reload.
    storageBackend: AsyncStorage, // for web: window.localStorage

    // expire time, default: 1 day (1000 * 3600 * 24 milliseconds).
    // can be null, which means never expire.
    defaultExpires: 1000 * 3600 * 24,

    // cache data in the memory. default is true.
    enableCache: true,

    // if data was not found in storage or expired data was found,
    // the corresponding sync method will be invoked returning
    // the latest data.
    sync: {
      // we'll talk about the details later.
    }
  });

  constructor() {
    this.generateNewProfileNames();

    this.storage.load({ key: 'username' })
      .then(val => {
        this.username = val;
      })
      .catch(err => {
        this.username = '';
      });

    makeAutoObservable(this, undefined, { autoBind: true })

    this.gettingLocation = true;
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        // setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        accuracy: LocationAccuracy.BestForNavigation
      });
      this.setCenter({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      })
      this.gettingLocation = false;
    } catch(e) {
      debugger
    }
  })();

    // Geolocation
    // .requestAuthorization('whenInUse')
    // .then(result => {
    //   debugger;
    //   if (result === 'granted') {
    //     Geolocation.getCurrentPosition(
    //       (position) => {
    //         console.log(position);
    //         this.gettingLocation = false;
    //         this.currentLocation = {
    //           lat: position.coords.latitude,
    //           lng: position.coords.longitude
    //         }  
    //       },
    //       (error) => {
    //         // See error code charts below.
    //         this.gettingLocation = false;
    //         console.log(error.code, error.message);
    //       },
    //       { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    //   );
    //   } else {
    //     this.gettingLocation = false;
    //   }
    // })

    window.setInterval(() => {
      if (Math.random() > .3) {
        return;
      }
      // 38.61402238278568
      // -122.61602608867189
      if (this.currentLocation) {
        const spread = .25;
        const latitude = this.currentLocation.lat - spread * 2 * Math.random() + spread;
        const longitude = this.currentLocation.lng - spread * 2 * Math.random() + spread;
        const rating = {
          size: Math.floor(Math.random() * 5) + 1,
          consistency: Math.floor(Math.random() * 5) + 1
        };

        const poopData = { latlng: { lat: latitude, lng: longitude }, rating, timestamp: new Date().getTime() }
        runInAction(() => {

          const id = JSON.stringify(poopData)
          this.poops.push({ id, ...poopData }) //latlng: { lat: latitude, lng: longitude}, rating })
          if (this.poops.length > 10) {
            this.poops.shift()
          }
        })
      }
    }, 2000);

    setTimeout(() => { initFirebase(); });
  }

  get displayedPoops(): Array<PoopSchema & { message: string }> {
    return this.poops.map(poop => {
      const userName = generateName(); // poop.user;
      const distance = calcDistance(poop.latlng.lat, poop.latlng.lng,
        this.currentLocation.lat, this.currentLocation.lng, 'M');

      const message = `${userName} had a ${(poop.rating.size + poop.rating.consistency) / 2} star poop ${distance.toFixed(1)} miles from your location.`;
      return {
        ...poop,
        message
      };
    });
  }

  get initialRegion() {
    return {
      latitude: 38.23142449854683,
      longitude: -122.63795390881849,
      latitudeDelta: 0,
      longitudeDelta: 0,
    };
  }

  get region() {
    return {
      latitude: this.currentLocation?.lat || 0,
      longitude: this.currentLocation?.lng || 0,
      latitudeDelta: 0,
      longitudeDelta: 0,
    };
  }

  setCenter(value: google.maps.LatLngLiteral) {
    // this.center = value;
    this.currentLocation = value;
  }

  // setZoom(value: number) {
  //   this.zoom = value;
  // }

  setMode(tab: number) {
    this.rating = { size: 0, consistency: 0 };

    this.mode = tab;

    if (tab === Mode.editProfile) {
      this.generateNewProfileNames();
    }
  }

  addPoop() {
    if (this.currentLocation) {
      const poop: PoopSchema = {
        id: '' + Math.random(),
        latlng: this.currentLocation,
        rating: this.rating,
        timestamp: new Date().getTime()
      };
      this.poops.unshift(poop);
    }
    this.setMode(Mode.showingMap);
  }

  generateNewProfileNames() {
    const result: Array<NameAndAvailability> = [];
    while (result.length < 5) {
      const name = generateName();
      result.push({ name, available: 'testing' });
    }
    // result[0].name = 'Test Pooper';
    this.newProfileNames = result;

    const testAvailability = (i: number) => {
      if (this.newProfileNames[i].available !== true) {
        isNameAvailable(result[i].name).then(available => {
          runInAction(() => {
            if (available) {
              this.newProfileNames[i].available = true;
            } else {
              this.newProfileNames[i].name = generateName();
              testAvailability(i);
            }
          });
        });
      }
    }

    for (let i = 0; i < result.length; i++) {
      testAvailability(i);
    }
  }

  showRegisterPoop = () => {
    
    this.showingRegisterPoop = true;
  }

  handleRegisterPoop = () => {
    this.showingRegisterPoop = false;
  }

  handleCancelRegisterPoop = () => {
    this.showingRegisterPoop = false;
  }

  handleRateSize = (size: number) => {
    this.rating.size = size;
  }

  handleRateConsistency = (consistency: number) => {
    this.rating.consistency = consistency;
  }
}

export const store = new Store();
