import * as React from 'react';
import MapView, { Camera, Marker } from 'react-native-maps';
import { observer } from 'mobx-react-lite';
import { autorun } from 'mobx';
import { Animated, Text, View } from 'react-native';
import SnackBar from 'react-native-snackbar-component'

import { store } from '../../store';
import { PoopSchema } from '../../types/poopSchema';

const style = { width: '100%', height: '100%' };

const PoopImages = [
  require('../../assets/images/poop1.png'),
  require('../../assets/images/poop1.5.png'),
  require('../../assets/images/poop2.png'),
  require('../../assets/images/poop2.5.png'),
  require('../../assets/images/poop3.png'),
  require('../../assets/images/poop3.5.png'),
  require('../../assets/images/poop4.png'),
  require('../../assets/images/poop4.5.png'),
  require('../../assets/images/poop5.png'),
];

export const MapWithMarkers = observer(() => {

  const map: React.LegacyRef<MapView> = React.useRef(null);
  const [lastPoop, setLastPoop] = React.useState<PoopSchema | null>(null);

  const animation = React.useRef(new Animated.Value(0));

  React.useEffect(() => {
    // when the current location changes, animate to that position
    return autorun(() => {
      if (store.region) {
        map?.current?.getCamera().then((cam: Camera) => {
          // cam.zoom += 1;
          cam.altitude = 10000; //cam.altitude / 2;
          map?.current?.animateCamera(cam);
        });
      }
    });
  }, []);


  React.useEffect(() => {
    // show new poops
    return autorun(() => {
      if (store.displayedPoops.length) {
        const lastPoop = store.displayedPoops[store.displayedPoops.length - 1];
        setLastPoop(lastPoop);
        map?.current?.getCamera().then((cam: Camera) => {
          // cam.zoom += 1;
          cam.altitude = 10000; //cam.altitude / 2;
          cam.center.latitude = lastPoop.latlng.lat;
          cam.center.longitude = lastPoop.latlng.lng;
          map?.current?.animateCamera(cam);
        });
      }
    });
  }, []);

  const handlePress = () => {
    store.showRegisterPoop();
  }

  return <View style={style}>
    <MapView
      ref={map}
      style={style}
      initialRegion={store.initialRegion}
      onPress={handlePress}>
      {store.displayedPoops.map(poop =>
        <Marker
          key={poop.id}
          coordinate={{ latitude: poop.latlng.lat, longitude: poop.latlng.lng }}
          image={PoopImages[poop.rating.size + poop.rating.consistency - 2]}
          title={poop.message}>
        </Marker>)}

    </MapView>
    {lastPoop && <SnackBar
      visible={true}
      position='bottom'
      textMessage={lastPoop.message}
    />}
  </View>
});
