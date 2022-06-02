import React, { Component, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  Appearance,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import MapView, { Polyline } from 'react-native-maps';
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
  colorScheme: string;
  latitude: number;
  longitude: number;
  cityPicked: { latitude: number; longitude: number };
  userType: string;
  formDone: boolean;
}
export default class MapScreen extends Component<MapProps, MapState> {
  constructor(public props: MapProps) {
    super(props);
    this.state = {
      colorScheme: null!,
      latitude: 0,
      longitude: 0,
      cityPicked: null!,
      userType: null!,
      formDone: false
    };
  }

  selectCity(city: any) {
    this.setState({
      cityPicked: { latitude: city.latitude, longitude: city.longitude }
    });
    this.setState({ latitude: city.latitude });
    this.setState({ longitude: city.longitude });
  }

  componentDidMount() {
    // this.props.navigation.setOptions({
    //   headerShown: false
    // });
    const colorScheme = Appearance.getColorScheme();
    if (colorScheme) this.setState({ colorScheme });
  }

  render() {
    const { latitude, longitude, cityPicked, colorScheme, formDone, userType } =
      this.state;
    const cities = [
      {
        id: 1,
        name: 'Bordeaux',
        latitude: 44.837789,
        longitude: -0.57918,
        coords: polygon
      },
      {
        id: 2,
        name: 'Marseille',
        latitude: 48.856614,
        longitude: 2.3522219,
        coords: polygon
      },
      {
        id: 3,
        name: 'Paris',
        latitude: 48.856614,
        longitude: 2.3522219,
        coords: polygon
      },
      {
        id: 4,
        name: 'Lyon',
        latitude: 48.856614,
        longitude: 2.3522219,
        coords: polygon
      },
      {
        id: 5,
        name: 'Lilles',
        latitude: 48.856614,
        longitude: 2.3522219,
        coords: polygon
      }
    ];
    colorScheme ? console.log({ colorScheme }) : null;
    return formDone ? (
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
            latitude: latitude,
            longitude: longitude,
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
      <View style={styles.containerModal}>
        <View style={styles.containerCities}>
          <Text style={styles.textTitle}>
            Sélectionnez la ville que vous souhaitez explorer
          </Text>
          <ScrollView
            style={styles.containerScrollview}
            contentContainerStyle={{
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {cities.map((city) => {
              return (
                <Text
                  style={styles.textCity}
                  key={city.id}
                  onPress={() => this.selectCity(city)}
                >
                  {city.name}
                </Text>
              );
            })}
          </ScrollView>
        </View>
        <View style={styles.containerBaroudeur}>
          <Text style={styles.textTitle}>A Bordeaux, vous êtes :</Text>
          <View style={styles.containerImage}>
            <TouchableOpacity
              style={styles.imageText}
              activeOpacity={0.2}
              onPress={() => this.setState({ userType: 'Explorateur' })}
            >
              <Image
                style={styles.image}
                source={require('../assets/explorer.png')}
              />
              <Text style={styles.textUnderImage}>Explorateur</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.imageText}
              activeOpacity={0.7}
              onPress={() => this.setState({ userType: 'Resident' })}
            >
              <Image
                style={styles.image}
                source={require('../assets/resident.png')}
              />
              <Text style={styles.textUnderImage}>Résident</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={styles.buttonValider}
          onPress={() =>
            cityPicked !== null && userType !== null
              ? this.setState({ formDone: true })
              : alert('Veuillez compléter les champs requis')
          }
        >
          <Text style={styles.textButton}>Valider</Text>
        </TouchableOpacity>
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
  containerModal: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    paddingTop: '5%',
    paddingBottom: '5%'
  },
  containerCities: {
    width: '100%',
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center'
  },
  textTitle: {
    fontSize: 16,
    fontWeight: '500'
  },
  containerScrollview: {
    width: '80%',
    maxHeight: 180,
    backgroundColor: '#3C896D',
    borderRadius: 10,
    marginTop: '3%'
  },
  textCity: {
    fontSize: 18,
    fontWeight: '500',
    color: '#fff',
    marginTop: '2%'
  },
  containerBaroudeur: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    marginTop: '5%'
  },
  containerImage: {
    width: '100%',
    marginTop: '3%',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  image: {
    width: 180,
    height: 180
  },
  imageText: {
    flexDirection: 'column'
  },
  textUnderImage: {
    fontSize: 18,
    fontWeight: '400',
    alignSelf: 'center'
  },
  buttonValider: {
    width: '80%',
    padding: '1%',
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: '#3C896D'
  },
  textButton: {
    fontWeight: '700',
    fontSize: 18,
    color: '#fff',
    alignSelf: 'center'
  }
});
