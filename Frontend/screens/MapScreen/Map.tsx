import React, { Component, useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MapView, { Polyline, Marker } from 'react-native-maps';
import { NavigationProps } from '../../navigation/app-stacks';
import { Ionicons } from '@expo/vector-icons';
import { getDistance } from 'geolib';

import CustomMarker from '../../components/CustomMarker';
import ModalMap from '../../components/ModalMap';
import Quartier from '../../components/Quartier';

import MarkerApi from '../../services/point_interet.api_service';
import MarkerModel from '../../services/point_interet.model';
import City from '../../services/city.model';
import QuartierModel from '../../services/quartier.model';

interface MapProps extends NavigationProps {
  latitude: number;
  longitude: number;
  cityPicked: City;
  quartiers: Array<QuartierModel>;
  userType: string;
  setLocation: Function;
}

export default function MapFunction(props: MapProps) {
  const [markers, SetMarkers] = useState<Array<MarkerModel>>([]);
  const [constantMarkers, setConstantMarkers] = useState<Array<MarkerModel>>(
    []
  );
  const [themeChoisi, setThemeChoisi] = useState<Array<string>>([]);
  const [displayModal, setDisplayModal] = useState<boolean>(false);

  const setModalVisible = (modalVisible: boolean) => {
    setDisplayModal(modalVisible);
  };

  function selectTheme(theme: string) {
    if (themeChoisi.includes(theme)) {
      const newThemesArray = [...themeChoisi];
      newThemesArray.splice(newThemesArray.indexOf(theme));
      console.log(newThemesArray);
      if (newThemesArray.length === 0) {
        SetMarkers(constantMarkers);
        setThemeChoisi([]);
      } else {
        setThemeChoisi(newThemesArray);
        filter(newThemesArray);
      }
    } else {
      if (theme !== 'Annuler') {
        const newTheme = [...themeChoisi, theme];
        setThemeChoisi(newTheme);
        filter(newTheme);
      } else {
        setThemeChoisi([]);
        SetMarkers(constantMarkers);
        setDisplayModal(false);
      }
    }
  }

  function filter(themeChoisi: Array<string>) {
    const filteredMarkers = constantMarkers.filter((marker) => {
      if (themeChoisi.includes(marker.theme)) {
        console.log(marker);
        return marker;
      }
    });
    SetMarkers(filteredMarkers);
  }

  function loadMarkers() {
    // props.quartiers.forEach((quartier) => {
    //   quartier.listePI.map((pi: string) => {
    //     MarkerApi.getPIFromId(pi).then((marker) => {
    //       SetMarkers([...markers, marker]);
    //       setConstantMarkers([...constantMarkers, marker]);
    //     });
    //   });
    // });
    MarkerApi.getPI().then((markers) => {
      SetMarkers(markers);
      setConstantMarkers(markers);
    });
  }

  useEffect(() => {
    loadMarkers();
    props.quartiers.map((quartier) => console.log(quartier.name));
  }, []);

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
          latitude: props.latitude,
          longitude: props.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1
        }}
        mapPadding={{ top: 5, right: 5, left: 5, bottom: 5 }}
        onUserLocationChange={(user) => {
          //On déplace la caméra du joueur vers ses coordoonées (latitude, longitude)
          const latitude = user.nativeEvent.coordinate.latitude;
          const longitude = user.nativeEvent.coordinate.longitude;
          props.setLocation(latitude, longitude);
        }}
        camera={{
          center: {
            longitude: props.longitude,
            latitude: props.latitude
          },
          pitch: 70,
          heading: 0,
          zoom: 15,
          altitude: 0
        }}
        // Only on iOS MapKit, in meters. The property is ignored by Google Maps.

        style={styles.map}
        // showsUserLocation={true}
        showsCompass={true}
        showsMyLocationButton={true}
        // zoomEnabled={false}
        // pitchEnabled={false}
      >
        <Marker
          coordinate={{
            latitude: props.latitude,
            longitude: props.longitude
          }}
        />
        {props.quartiers.map((quartier) => {
          return (
            <Quartier
              key={quartier._id + quartier.name}
              position={{
                latitude: props.latitude,
                longitude: props.longitude
              }}
              quartier={quartier}
            />
          );
        })}

        <Polyline coordinates={props.cityPicked.polygon} strokeWidth={2} />

        {/* {markers.map((marker) => {
          return getDistance(
            { latitude: latitude, longitude: longitude },
            { latitude: marker.latitude, longitude: marker.longitude }
          ) < 1000 ? (
            <CustomMarker
              key={marker._id}
              marker={marker}
              navigation={this.props.navigation}
            />
          ) : null;
        })} */}

        {markers.map((marker) => {
          return (
            <CustomMarker
              key={marker._id}
              marker={marker}
              navigation={props.navigation}
            />
          );
        })}
      </MapView>

      <View style={styles.viewThemeChoisi}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="ios-settings-sharp" size={30} color="#808080" />
        </TouchableOpacity>
      </View>
      <ModalMap
        setModalVisible={setModalVisible}
        modalVisible={displayModal}
        selectTheme={selectTheme}
        themeChoisi={themeChoisi}
        navigation={props.navigation}
      />
    </View>
  ) : (
    <View>
      <ActivityIndicator />
    </View>
  );
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
    top: '6%',
    left: '6%'
  },
  button: {
    backgroundColor: '#fff',
    width: 40,
    height: 40,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
