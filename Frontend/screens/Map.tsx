import React, { Component, useRef } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MapView, { Circle, Polygon, Polyline } from 'react-native-maps';
import { NavigationProps } from '../navigation/app-stacks';
import CustomMarker from '../components/CustomMarker';
import { polygon } from '../Data/Bdx';
import { StMichel } from '../Data/StMichel';
import { GdHommes } from '../Data/GdHommes';
import { SteCroix } from '../Data/SteCroix';
import { StPaul } from '../Data/StPaul';
import { StPierre } from '../Data/StPierre';
import { Victoire } from '../Data/Victoire';

interface MapProps extends NavigationProps {}

interface MapState {
  latitude: number;
  longitude: number;
  cityPicked: { latitude: number; longitude: number };
}
export default class MapScreen extends Component<MapProps, MapState> {
  constructor(public props: MapProps) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      cityPicked: null!
    };
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      headerShown: false
    });
    this.setState({ cityPicked: { latitude: 44.837789, longitude: -0.57918 } });
  }

  render() {
    const { latitude, longitude, cityPicked } = this.state;
    return cityPicked ? (
      <View
        style={styles.container}
        onTouchStart={() =>
          this.props.navigation.setOptions({
            headerShown: true
          })
        }
        onTouchEnd={() =>
          this.props.navigation.setOptions({
            headerShown: false
          })
        }
      >
        <MapView
          initialRegion={{
            latitude: cityPicked.latitude,
            longitude: cityPicked.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1
          }}
          mapPadding={{ top: 5, right: 5, left: 5, bottom: 5 }}
          onUserLocationChange={(user) => {
            //On déplace la caméra du joueur vers ses coordoonées (latitude, longitude)
            this.setState({ latitude: user.nativeEvent.coordinate.latitude });
            this.setState({ longitude: user.nativeEvent.coordinate.longitude });
          }}
          // camera={{
          //   center: {
          //     longitude: this.state.longitude,
          //     latitude: this.state.latitude
          //   },
          //   pitch: 70,
          //   heading: 0,
          //   zoom: 15,
          //   altitude: 0
          // }}
          // Only on iOS MapKit, in meters. The property is ignored by Google Maps.

          style={styles.map}
          showsUserLocation={true}
          showsCompass={true}
          showsMyLocationButton={true}
          // zoomEnabled={false}
          // pitchEnabled={false}
        >
          <Polyline coordinates={polygon} strokeWidth={2} />
          <Polyline coordinates={GdHommes} strokeWidth={2} />
          <Polyline coordinates={SteCroix} strokeWidth={2} />
          <Polyline coordinates={StMichel} strokeWidth={2} />
          <Polyline coordinates={StPaul} strokeWidth={2} />
          <Polyline coordinates={StPierre} strokeWidth={2} />
          <Polyline coordinates={Victoire} strokeWidth={2} />
          <CustomMarker navigation={this.props.navigation} />
        </MapView>
      </View>
    ) : (
      <View>
        <ActivityIndicator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});
