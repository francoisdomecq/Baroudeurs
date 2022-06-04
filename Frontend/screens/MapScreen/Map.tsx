import React, { Component } from 'react';
import { View, StyleSheet, Text, Appearance } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import MapView, { Polyline, Marker } from 'react-native-maps';
import { NavigationProps } from '../../navigation/app-stacks';
import { Ionicons } from '@expo/vector-icons';

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
import ThemeButton from '../../components/ThemeButton';

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
  displayTheme: boolean;
}
export default class Map extends Component<MapProps, MapState> {
  constructor(public props: MapProps) {
    super(props);
    this.state = {
      markers: [],
      themeChoisi: '',
      displayTheme: false
    };
  }

  selectTheme = (theme: string) => {
    if (theme !== 'Annuler') {
      this.setState({ themeChoisi: theme });
      const filteredMarkers = MARKERS_DATA.filter((marker) => {
        if (marker.theme === theme) return marker;
      });
      this.setState({ markers: filteredMarkers });
      this.setState({ displayTheme: false });
    } else {
      this.setState({ markers: MARKERS_DATA });
      this.setState({ displayTheme: false });
    }
  };

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
        {this.state.displayTheme ? (
          <ScrollView
            horizontal
            scrollEventThrottle={1}
            showsHorizontalScrollIndicator={false}
            style={styles.scrollview}
          >
            {
              //On récupère ici les différents thèmes que nous avons défini dans Themes.js
              THEMES.map((theme) => (
                <ThemeButton
                  theme={theme}
                  selectTheme={this.selectTheme}
                  themeChoisi={this.state.themeChoisi}
                />
              ))
            }
          </ScrollView>
        ) : (
          <View style={styles.viewThemeChoisi}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.setState({ displayTheme: true })}
            >
              <Ionicons
                name="arrow-forward-circle-outline"
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>
        )}
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
  viewThemeChoisi: {
    position: 'absolute',
    paddingLeft: '1%',
    paddingRight: '1%',
    top: '2%',
    left: '1%'
  },
  button: {
    backgroundColor: '#fff',
    width: 24,
    height: 24,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
