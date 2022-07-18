import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { MapWithMarkers } from '../components/MapWithMarkers/MapWithMarkers';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { MapWithMarkers2 } from '../components/MapWithMarkers/MapWithMarkers2';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  return (
    <View style={styles.container}>
      {/* <Text>Hi</Text> */}
       <MapWithMarkers />
      {/* <Text style={styles.title}>Tab OneXXYZ</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    border: "5px solid red",
    backgroundColor: 'blue'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
