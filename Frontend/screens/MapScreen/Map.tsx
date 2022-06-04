import React, { Component } from 'react';
import { View, StyleSheet, Text, Appearance } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import MapView, { Polyline, Marker } from 'react-native-maps';
import { NavigationProps } from '../../navigation/app-stacks';

import CustomMarker from '../../components/CustomMarker';

import { polygon } from '../../Data/Bdx';
import { StMichel } from '../../Data/StMichel';
import { GdHommes } from '../../Data/GdHommes';
import { SteCroix } from '../../Data/SteCroix';
import { StPaul } from '../../Data/StPaul';
import { StPierre } from '../../Data/StPierre';
import { Victoire } from '../../Data/Victoire';
import { MARKERS_DATA } from '../../Data/Markers_Data';
import { THEMES } from '../../Data/Theme';

import MarkerModel from '../../services/Marker';

interface MapProps extends NavigationProps {
  latitude: number;
  longitude: number;
  cityPicked: { name: string; latitude: number; longitude: number };
  userType: string;
  setLocation: Function;
}

interface MapState {
  markers: Array<MarkerModel>;
  themeChoisi: string;
}
export default class Map extends Component<MapProps, MapState> {
  constructor(public props: MapProps) {
    super(props);
    this.state = {
      markers: [],
      themeChoisi: ''
    };
  }

  selectTheme(theme: string) {
    this.setState({ themeChoisi: theme });
    const filteredMarkers = MARKERS_DATA.filter((marker) => {
      if (marker.theme === theme) return marker;
    });
    this.setState({ markers: filteredMarkers });
  }

  componentDidMount() {
    this.setState({ markers: MARKERS_DATA });
  }

  render() {
    const { markers } = this.state;
    const { latitude, longitude, userType, cityPicked, setLocation } =
      this.props;
    return (
      <View
        style={styles.container}
        // onTouchStart={() =>
        //   this.props.navigation.setOptions({
        //     headerShown: true
        //   })
        // }
        // onTouchEnd={() =>
        //   this.props.navigation.setOptions({
        //     headerShown: false
        //   })
        // }
      >
        <MapView
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1
          }}
          mapPadding={{ top: 5, right: 5, left: 5, bottom: 5 }}
          onUserLocationChange={(user) => {
            //On déplace la caméra du joueur vers ses coordoonées (latitude, longitude)
            const latitude = user.nativeEvent.coordinate.latitude;
            const longitude = user.nativeEvent.coordinate.longitude;
            setLocation(latitude, longitude);
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
          //   showsUserLocation={true}
          showsCompass={true}
          showsMyLocationButton={true}
          // zoomEnabled={false}
          // pitchEnabled={false}
        >
          <Marker
            coordinate={{
              latitude: latitude,
              longitude: longitude
            }}
          />
          <Polyline coordinates={polygon} strokeWidth={2} />
          {/* <Polyline coordinates={GdHommes} strokeWidth={2} />
          <Polyline coordinates={SteCroix} strokeWidth={2} />
          <Polyline coordinates={StMichel} strokeWidth={2} />
          <Polyline coordinates={StPaul} strokeWidth={2} />
          <Polyline coordinates={StPierre} strokeWidth={2} />
          <Polyline coordinates={Victoire} strokeWidth={2} /> */}
          {markers.map((marker) => {
            return (
              <CustomMarker
                key={marker.id}
                marker={marker}
                navigation={this.props.navigation}
              />
            );
          })}
        </MapView>
        <ScrollView
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          style={styles.scrollview}
        >
          {
            //On récupère ici les différents thèmes que nous avons défini dans Themes.js
            THEMES.map((themes) => (
              // Un component TouchableOpacity permet à l'utilisateur de cliquer dessus et de lancer un event suite au clic
              <TouchableOpacity
                key={themes.id}
                style={styles.itemsTheme}
                //Ici l'event lorsque l'utilisateur clique sur un thème et que l'on appelle la fonction _choixTheme qui actualise le state de themeChoisi
                onPress={() => this.selectTheme(themes.name)}
              >
                <Text>{themes.name}</Text>
              </TouchableOpacity>
            ))
          }
        </ScrollView>
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
  },
  scrollview: {
    position: 'absolute',
    paddingLeft: '1%',
    paddingRight: '1%',
    top: '2%'
  },
  itemsTheme: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 0,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    height: 22
  }
});
