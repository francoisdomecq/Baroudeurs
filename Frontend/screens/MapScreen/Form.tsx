import { Component, ReactNode } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  TextInput
} from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { getDistance } from 'geolib';
import * as Location from 'expo-location';
import { FontAwesome } from '@expo/vector-icons';

import City from '../../services/city.model';
import CityApi from '../../services/city.api_service';

const explorateur = require('../../assets/explorer.png');
const resident = require('../../assets/resident.png');

interface FormProps {
  latitude: number;
  longitude: number;
  cityPicked: City;
  userType: string;
  selectCity: Function;
  setUserType: Function;
  setFormDone: Function;
  setLocation: Function;
}

interface FormState {
  selectedCity: String;
  selectedUserType: string;
  constantCities: Array<City>;
  cities: Array<City>;
  distance: Array<number>;
  searchFiled: string;
  hasUpdated: boolean;
}

export default class Form extends Component<FormProps, FormState> {
  constructor(public props: FormProps) {
    super(props);
    this.state = {
      selectedCity: '',
      selectedUserType: '',
      searchFiled: '',
      constantCities: [],
      cities: [],
      distance: [],
      hasUpdated: false
    };
  }

  searchCities(search: string) {
    const citiesFiltered = this.state.constantCities.filter((city) => {
      return city.name.includes(search);
    });
    this.setState({ cities: citiesFiltered });
  }

  selectCity(city: City) {
    this.setState({ selectedCity: city.name });
    this.props.selectCity(city);
  }

  selectUserType(user: string) {
    this.setState({ selectedUserType: user });
    this.props.setUserType(user);
  }

  loadCities = () => {
    CityApi.getAllCities().then((cities) => {
      this.setState({ cities });
      this.setState({ constantCities: cities });
    });
  };

  getLocation = () => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      if (location) {
        this.props.setLocation(
          location.coords.latitude,
          location.coords.longitude
        );
      } else {
        alert('Pas récupérée');
      }
    })();
  };

  componentDidMount() {
    this.loadCities();
    this.getLocation();
  }

  componentDidUpdate() {
    if (
      this.state.cities.length > 0 &&
      this.props.latitude !== 0 &&
      this.props.longitude !== 0 &&
      this.state.hasUpdated === false
    ) {
      // this.state.cities.map((city) => {
      //   let distance = getDistance(
      //     { latitude: this.props.latitude, longitude: this.props.longitude },
      //     {
      //       latitude: city.latitude,
      //       longitude: city.longitude
      //     }
      //   );
      //   this.setState({ distance: [...this.state.distance, distance] });
      // });

      this.state.cities.sort((a, b) => {
        let distanceA = getDistance(
          { latitude: this.props.latitude, longitude: this.props.longitude },
          {
            latitude: a.latitude,
            longitude: a.longitude
          }
        );
        let distanceB = getDistance(
          { latitude: this.props.latitude, longitude: this.props.longitude },
          {
            latitude: b.latitude,
            longitude: b.longitude
          }
        );
        return distanceA - distanceB;
      });
      // this.setState({ constantCities: this.state.cities });
    }
  }

  render() {
    const {
      userType,
      cityPicked,
      setUserType,
      setFormDone,
      latitude,
      longitude
    } = this.props;

    const { cities, selectedUserType, selectedCity } = this.state;
    return explorateur && resident && cities && latitude && longitude ? (
      <View style={styles.containerModal}>
        <View style={styles.containerCities}>
          <Text style={styles.textTitle}>Choisir une ville</Text>
          <View style={styles.searchBar}>
            <FontAwesome name="search" size={24} color="#f0efef" />
            <TextInput
              style={styles.searchInput}
              onChange={(e) => this.searchCities(e.nativeEvent.text)}
              placeholder="Recherchez"
              placeholderTextColor={'#f0efef'}
            />
          </View>
          <View style={styles.containerScrollView}>
            <ScrollView style={styles.scrollview} contentContainerStyle={{}}>
              {cities.length > 0 ? (
                cities.map((city) => {
                  return (
                    <TouchableOpacity
                      style={styles.cityView}
                      key={city._id}
                      onPress={() => this.selectCity(city)}
                    >
                      <Text
                        style={
                          stylesProps(
                            city.name === selectedCity ||
                              (cities.indexOf(city) === 0 &&
                                selectedCity === '')
                              ? 1
                              : 0.6
                          ).textCity
                        }
                      >
                        {city.name}
                      </Text>
                      <Text
                        style={
                          stylesProps(
                            city.name === selectedCity ||
                              (cities.indexOf(city) === 0 &&
                                selectedCity === '')
                              ? 1
                              : 0.6
                          ).textCity
                        }
                      >
                        {cities.indexOf(city) === 0
                          ? 'Vous êtes ici'
                          : getDistance(
                              { latitude: latitude, longitude: longitude },
                              {
                                latitude: city.latitude,
                                longitude: city.longitude
                              },
                              100
                            ) /
                              1000 +
                            ' km'}
                      </Text>
                    </TouchableOpacity>
                  );
                })
              ) : (
                <Text style={stylesProps(1).textCity}>
                  Aucune vile ne correspond
                </Text>
              )}
            </ScrollView>
          </View>
        </View>
        {cityPicked ? (
          <View style={styles.containerBaroudeur}>
            <Text style={styles.textTitle}>
              A {cityPicked.name}, vous êtes :
            </Text>
            <View style={styles.containerImage}>
              <TouchableOpacity
                style={styles.imageText}
                onPress={() => this.selectUserType('Explorateur')}
              >
                <Image
                  style={
                    stylesProps(selectedUserType === 'Explorateur' ? 0.6 : 1)
                      .image
                  }
                  source={explorateur}
                />
                <Text style={styles.textUnderImage}>Explorateur</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imageText}
                onPress={() => this.selectUserType('Résident')}
              >
                <Image
                  style={
                    stylesProps(selectedUserType === 'Résident' ? 0.6 : 1).image
                  }
                  source={resident}
                />
                <Text style={styles.textUnderImage}>Résident</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
        {cityPicked && userType ? (
          <TouchableOpacity
            style={styles.buttonValider}
            onPress={() =>
              cityPicked !== null && userType !== null
                ? setFormDone(cityPicked, userType)
                : alert('Veuillez compléter les champs requis')
            }
          >
            <Text style={styles.textButton}>Valider</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    ) : (
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <ActivityIndicator size="large" color="#46B82F" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerModal: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    paddingTop: '15%',
    paddingBottom: '5%'
  },
  containerCities: {
    width: '100%',
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center'
  },
  textTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: '3%'
  },
  searchBar: {
    height: 40,
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '4%',
    paddingRight: '2%',
    backgroundColor: '#46B82F',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderColor: '#fff',
    borderBottomColor: '#fff',
    borderBottomWidth: 3,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 3
  },
  searchInput: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '5%',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
    color: '#fff'
  },
  containerScrollView: {
    width: '80%',
    backgroundColor: '#46B82F',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 3
  },
  scrollview: {
    width: '100%',
    maxHeight: 180,
    // marginTop: '3%',
    paddingBottom: '2%',
    paddingLeft: '4%',
    paddingRight: '4%'
  },
  cityView: {
    width: '100%',
    height: 35,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#fff',
    borderBottomWidth: 1
  },
  textCity: {
    fontSize: 18,
    fontWeight: '500',
    color: '#fff',
    marginTop: '4%'
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
    padding: '2%',
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: '#46B82F',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 3
  },
  textButton: {
    fontWeight: '700',
    fontSize: 18,
    color: '#fff',
    alignSelf: 'center'
  }
});

const stylesProps = (opacity: number) =>
  StyleSheet.create({
    textCity: {
      fontSize: 18,
      fontWeight: '500',
      color: '#fff',
      marginTop: '2%',
      opacity: opacity
    },

    image: {
      width: 180,
      height: 180,
      opacity: opacity
    }
  });
