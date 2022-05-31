import React, { Component, useRef } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MapView, { Circle, Polygon, Polyline } from 'react-native-maps';
import { NavigationProps } from '../navigation/app-stacks';
import CustomMarker from '../components/CustomMarker';
import { polygon } from '../Data/Bdx';
interface MapProps extends NavigationProps {}

interface MapState {
  latitude: number;
  longitude: number;
}
export default class MapScreen extends Component<MapProps, MapState> {
  constructor(public props: MapProps) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0
    };
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      title: 'Profil',
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('User');
          }}
          style={{
            alignItems: 'center',
            marginRight: 10
          }}
        >
          <Ionicons name="md-log-out" size={30} color="#2196F3" />
          <Text style={{ fontSize: 8, fontWeight: '700', color: '#2196F3' }}>
            Paramètres
          </Text>
        </TouchableOpacity>
      )
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
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
          {/* <Circle
            center={{
              latitude: 44.837789,
              longitude: -0.57918
            }}
            radius={5000}
          ></Circle> */}

          {/* <Polygon
            fillColor="#fff"
            strokeColor="rgba(0, 0, 0, 1)"
            strokeWidth={1}
            // coordinates={polygon}
            coordinates={[
              { latitude: 48.862725, longitude: 2.287592 },
              { latitude: 48.842781658378726, longitude: 2.3644618703461484 },
              { latitude: 48.835328169344194, longitude: 2.301119326866794 }
            ]}
            zIndex={15}
          /> */}
          <Polyline coordinates={polygon} strokeWidth={5} />

          <CustomMarker navigation={this.props.navigation} />
        </MapView>
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
