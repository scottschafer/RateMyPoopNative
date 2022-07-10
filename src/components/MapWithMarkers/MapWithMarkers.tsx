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
  // require('../../assets/images/poop0.png'),
  // require('../../assets/images/poop0.5.png'),
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

  // const state = {
  //   markers: [
  //     {
  //       coordinate: {
  //         latitude: 45.524548,
  //         longitude: -122.6749817,
  //       },
  //       title: "Best Place",
  //       description: "This is the best place in Portland",
  //       image: Images[0],
  //     },
  //     {
  //       coordinate: {
  //         latitude: 45.524698,
  //         longitude: -122.6655507,
  //       },
  //       title: "Second Best Place",
  //       description: "This is the second best place in Portland",
  //       image: Images[1],
  //     },
  //     {
  //       coordinate: {
  //         latitude: 45.5230786,
  //         longitude: -122.6701034,
  //       },
  //       title: "Third Best Place",
  //       description: "This is the third best place in Portland",
  //       image: Images[2],
  //     },
  //     {
  //       coordinate: {
  //         latitude: 45.521016,
  //         longitude: -122.6561917,
  //       },
  //       title: "Fourth Best Place",
  //       description: "This is the fourth best place in Portland",
  //       image: Images[3],
  //     },
  //   ],
  //   region: {
  //     latitude: 45.52220671242907,
  //     longitude: -122.6653281029795,
  //     latitudeDelta: 0.04864195044303443,
  //     longitudeDelta: 0.040142817690068,
  //   },
  // };

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
  });


  React.useEffect(() => {
    // show new poops
    return autorun(() => {
      if (store.displayedPoops.length) {
        const lastPoop = store.displayedPoops[store.displayedPoops.length - 1];
        setLastPoop(lastPoop);
        // Snackbar.show({
        //   text: lastPoop.message,
        //   duration: Snackbar.LENGTH_SHORT
        // });
        map?.current?.getCamera().then((cam: Camera) => {
          // cam.zoom += 1;
          cam.altitude = 10000; //cam.altitude / 2;
          cam.center.latitude = lastPoop.latlng.lat;
          cam.center.longitude = lastPoop.latlng.lng;
          map?.current?.animateCamera(cam);
        });
      }
    });
  });

  const handlePress = () => {
    store.showRegisterPoop();
  }

  return <View style={style}>
    <MapView
      ref={map}
      style={style}
      // region={store.region}
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
    // actionHandler={()=>{console.log("snackbar button clicked!")}}
    // actionText="let's go"
    />}
  </View>
});

// // import { Wrapper, Status } from '@googlemaps/react-wrapper';
// // import { createCustomEqual } from 'fast-equals';
// // import { isLatLngLiteral } from '@googlemaps/typescript-guards';
// // // import './MapWithMarkers.sass';
// // import { observer } from 'mobx-react-lite';
// // import { Mode, PoopSchema, store } from '../../store';
// // import { autorun } from 'mobx';
// // // import { generateName } from './nameGenerator';

// // import styles from "./MapWithMarkers.sass";

// const API_KEY = 'AIzaSyC0c11EK58xUibES6X9m3af1k00wWZgHu0';

// // function getLocation() {
// //   if (navigator.geolocation) {
// //     navigator.geolocation.getCurrentPosition(showPosition => {
// //       console.log(showPosition)
// //     });
// //   }
// // }
// // getLocation()

// type Props = {};
// const render = (status: Status) => {
//   return <h1>{status}</h1>;
// };

// export const MapWithMarkers: React.VFC = observer((props: Props) => {
//   const [clicks, setClicks] = React.useState<google.maps.LatLng[]>([]);
//   const [zoom, setZoom] = React.useState(3); // initial zoom
//   const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
//     lat: 0,
//     lng: 0,
//   });

//   const [displayed, setDisplayed] = React.useState({} as any);
//   // const { enqueueSnackbar, closeSnackbar } = useSnackbar();

//   React.useEffect(() => {
//     autorun(() => {
//       // const poops = store.poops;
//       // poops.forEach((poop) => {
//       //   if (poop.id && !displayed[poop.id] && store.currentLocation) {

//       //     const distance = calcDistance(poop.latlng.lat, poop.latlng.lng,
//       //       store.currentLocation.lat, store.currentLocation.lng, 'M');


//       //       setCenter(poop.latlng);
//       //       // google.maps.LatLngLiteral
//       //     enqueueSnackbar(
//       //       `${generateName()} had a ${(poop.rating.size + poop.rating.consistency)/2} star poop ${distance.toFixed(1)} miles from your location.`,
//       //       {
//       //         autoHideDuration: 10000
//       //       });
//       //     displayed[poop.id] = true;
//       //   }
//       // });
//     });

//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition((position) => {
//         console.log(position);
//         setCenter({
//           lat: position.coords.latitude,
//           lng: position.coords.longitude,
//         });
//         setZoom(10);
//       });
//     }
//   });

//   const onClick = (e: google.maps.MapMouseEvent) => {
//     // avoid directly mutating state
//     // setClicks([...clicks, e.latLng!]);

//     store.setMode(Mode.ratingPoop);
//   };

//   const onIdle = (m: google.maps.Map) => {
//     console.log('onIdle');
//     setZoom(m.getZoom()!);
//     setCenter(m.getCenter()!.toJSON());
//   };

//   // const form = (
//   //   <div
//   //     style={{
//   //       padding: '1rem',
//   //       flexBasis: '250px',
//   //       height: '100%',
//   //       overflow: 'auto',
//   //     }}
//   //   >
//   //     <label htmlFor='zoom'>Zoom</label>
//   //     <input
//   //       type='number'
//   //       id='zoom'
//   //       name='zoom'
//   //       value={zoom}
//   //       onChange={(event) => setZoom(Number(event.target.value))}
//   //     />
//   //     <br />
//   //     <label htmlFor='lat'>Latitude</label>
//   //     <input
//   //       type='number'
//   //       id='lat'
//   //       name='lat'
//   //       value={center.lat}
//   //       onChange={(event) =>
//   //         setCenter({ ...center, lat: Number(event.target.value) })
//   //       }
//   //     />
//   //     <br />
//   //     <label htmlFor='lng'>Longitude</label>
//   //     <input
//   //       type='number'
//   //       id='lng'
//   //       name='lng'
//   //       value={center.lng}
//   //       onChange={(event) =>
//   //         setCenter({ ...center, lng: Number(event.target.value) })
//   //       }
//   //     />
//   //     <h3>{clicks.length === 0 ? 'Click on map to add markers' : 'Clicks'}</h3>
//   //     {clicks.map((latLng, i) => (
//   //       <pre key={i}>{JSON.stringify(latLng.toJSON(), null, 2)}</pre>
//   //     ))}
//   //     <button onClick={() => setClicks([])}>Clear</button>
//   //   </div>
//   // );

//   return (
//     // <div className='MapWithMarkers' style={{ display: 'flex', height: '100%' }}>
//       <Wrapper apiKey={API_KEY} render={render}>
//         <Map
//           center={center}
//           onClick={onClick}
//           onIdle={onIdle}
//           zoom={zoom}
//           style={{ flexGrow: '1', height: '100%' }}
//         >
//           {store.poops.map((poop) => (
//             <Marker key={poop.id} position={poop.latlng} rating={poop.rating} />
//           ))}

//           {/* {clicks.map((latLng, i) => (
//             <Marker key={i} position={latLng} />
//           ))} */}
//         </Map>
//       </Wrapper>
//     // </div>
//   );
// });

// interface MapProps extends google.maps.MapOptions {
//   style: { [key: string]: string };
//   onClick?: (e: google.maps.MapMouseEvent) => void;
//   onIdle?: (map: google.maps.Map) => void;
// }

// const Map: React.FC<MapProps> = ({
//   onClick,
//   onIdle,
//   children,
//   style,
//   ...options
// }) => {
//   const ref = React.useRef<HTMLDivElement>(null);
//   const [map, setMap] = React.useState<google.maps.Map>();

//   React.useEffect(() => {
//     if (ref.current && !map) {
//       setMap(new window.google.maps.Map(ref.current, {
//         panControl: false,
//         streetViewControl: false,
//         scaleControl: false,
//         zoomControl: false
//       }));
//     }
//   }, [ref, map]);

//   // because React does not do deep comparisons, a custom hook is used
//   // see discussion in https://github.com/googlemaps/js-samples/issues/946
//   // useDeepCompareEffectForMaps(() => {
//   //   if (map) {
//   //     map.setOptions(options);
//   //   }
//   // }, [map, options]);

//   React.useEffect(() => {
//     if (map) {
//       ['click', 'idle'].forEach((eventName) =>
//         google.maps.event.clearListeners(map, eventName)
//       );

//       if (onClick) {
//         map.addListener('click', onClick);
//       }

//       if (onIdle) {
//         map.addListener('idle', () => onIdle(map));
//       }
//     }
//   }, [map, onClick, onIdle]);

//   return (
//     <>
//       <div ref={ref} style={style} />
//       {React.Children.map(children, (child) => {
//         if (React.isValidElement(child)) {
//           // set the map prop on the child component
//           return React.cloneElement(child, { map });
//         }
//       })}
//     </>
//   );
// };

// const Marker: React.FC<
//   google.maps.MarkerOptions & { rating: PoopSchema['rating'] }
// > = (options) => {
//   const [marker, setMarker] = React.useState<google.maps.Marker>();

//   React.useEffect(() => {
//     if (!marker) {
//       const newMarker = new google.maps.Marker({
//         animation: google.maps.Animation.DROP
//       });
//       const rating = (options.rating.size + options.rating.consistency) / 2;
//       const icon = {
//         url: window.location.href + 'poop' + rating + '.png',
//         scaledSize: new google.maps.Size(80, 80),
//       };
//       newMarker.setIcon(icon);
//       newMarker.setOptions({});
//       setMarker(newMarker);
//     }

//     // remove marker from map on unmount
//     return () => {
//       if (marker) {
//         marker.setMap(null);
//       }
//     };
//   }, [marker]);

//   React.useEffect(() => {
//     if (marker) {
//       marker.setOptions(options);
//     }
//   }, [marker, options]);

//   return null;
// };

// // const deepCompareEqualsForMaps = createCustomEqual((deepEqual) => (a: any, b: any) => {
// //   if (
// //     isLatLngLiteral(a) ||
// //     a instanceof google.maps.LatLng ||
// //     isLatLngLiteral(b) ||
// //     b instanceof google.maps.LatLng
// //   ) {
// //     return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
// //   }

// //   // TODO extend to other types

// //   // use fast-equals for other objects
// //   return deepEqual(a, b);
// // }
// // );

// // function useDeepCompareMemoize(value: any) {
// //   const ref = React.useRef();

// //   if (!deepCompareEqualsForMaps(value, ref.current)) {
// //     ref.current = value;
// //   }

// //   return ref.current;
// // }

// // function useDeepCompareEffectForMaps(
// //   callback: React.EffectCallback,
// //   dependencies: any[]
// // ) {
// //   React.useEffect(callback, dependencies.map(useDeepCompareMemoize));
// // }

// // // window.addEventListener("DOMContentLoaded", () => {
// // //   ReactDom.render(<App />, document.getElementById("root"));
// // // });

// // // export {};

// // export default withSnackbar(MapWithMarkers);
