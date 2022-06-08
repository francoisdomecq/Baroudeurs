import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Appearance,
  ActivityIndicator
} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import MapView, { Polyline, Marker } from 'react-native-maps';
import { NavigationProps } from '../../navigation/app-stacks';
import { Ionicons } from '@expo/vector-icons';

import CustomMarker from '../../components/CustomMarker';
import ModalMap from '../../components/ModalMap';

import MarkerApi from '../../services/point_interet.api_service';
import MarkerModel from '../../services/point_interet.model';
import City from '../../services/city.model';

interface MapProps extends NavigationProps {
  latitude: number;
  longitude: number;
  cityPicked: City;
  userType: string;
  setLocation: Function;
}

interface MapState {
  markers: Array<MarkerModel>;
  constantMarkers: Array<MarkerModel>;
  themeChoisi: Array<string>;
  displayModal: boolean;
}
export default class Map extends Component<MapProps, MapState> {
  constructor(public props: MapProps) {
    super(props);
    this.state = {
      markers: [],
      constantMarkers: [],
      themeChoisi: [],
      displayModal: false
    };
  }

  setModalVisible = (modalVisible: boolean) => {
    this.setState({ displayModal: modalVisible });
  };

  selectTheme = (theme: string) => {
    if (this.state.themeChoisi.includes(theme)) {
      const newThemesArray = [...this.state.themeChoisi];
      newThemesArray.splice(newThemesArray.indexOf(theme));
      if (newThemesArray.length === 0) {
        this.setState({ markers: this.state.constantMarkers });
        this.setState({ themeChoisi: newThemesArray });
      } else {
        this.setState({ themeChoisi: newThemesArray });
        this.filter();
      }
    } else {
      if (theme !== 'Annuler') {
        const newTheme = [...this.state.themeChoisi, theme];
        this.setState({ themeChoisi: newTheme });
        this.filter();
      } else {
        this.setState({ themeChoisi: [] });
        this.setState({ markers: this.state.constantMarkers });
        this.setState({ displayModal: false });
      }
    }
  };

  filter() {
    const filteredMarkers = this.state.constantMarkers.filter((marker) => {
      if (this.state.themeChoisi.includes(marker.theme)) return marker;
    });
    this.setState({ markers: filteredMarkers });
  }

  loadMarkers = () => {
    MarkerApi.getPI().then((markers) => {
      this.setState({ markers: markers });
      this.setState({ constantMarkers: markers });
    });
  };

  componentDidMount() {
    this.loadMarkers();
  }

  render() {
    const { markers, displayModal, themeChoisi } = this.state;
    const { latitude, longitude, userType, cityPicked, setLocation } =
      this.props;
    return markers ? (
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
          {/* <Marker
            coordinate={{
              latitude: latitude,
              longitude: longitude
            }}
          /> */}
          <Polyline coordinates={cityPicked.polygon} strokeWidth={2} />

          {markers.map((marker) => {
            return (
              <CustomMarker
                key={marker._id}
                marker={marker}
                navigation={this.props.navigation}
              />
            );
          })}
        </MapView>

        <View style={styles.viewThemeChoisi}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.setModalVisible(true)}
          >
            <Ionicons name="menu" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <ModalMap
          setModalVisible={this.setModalVisible}
          modalVisible={displayModal}
          selectTheme={this.selectTheme}
          themeChoisi={this.state.themeChoisi}
        />
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
