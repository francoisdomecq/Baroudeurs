import { useContext, useEffect, useState } from 'react';
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
import { AppContext } from '../../utils/context';

const explorateur = require('../../assets/explorer.png');
const resident = require('../../assets/resident.png');

interface FormProps {
  setFormDone: Function;
}

export default function FormFunction(props: FormProps) {
  const { latitude, longitude, setPosition, userType, setUserType } =
    useContext(AppContext);
  const [cities, setCities] = useState<Array<City>>([]);
  const [constantCities, setConstantCities] = useState<Array<City>>([]);
  const [selectedCity, setSelectedCity] = useState<City>(null!);
  const [selectedUserType, setSelectedUserType] = useState<String>('');
  const [hasUpdated, setHasUpdated] = useState<Boolean>(false);

  function searchCities(search: string) {
    const citiesFiltered = constantCities.filter((city) => {
      return city.name.includes(search);
    });
    setCities(citiesFiltered);
  }

  function selectUserType(user: string) {
    setSelectedUserType(user);
    setUserType(user);
  }

  const loadCities = () => {
    CityApi.getAllCities().then((cities) => {
      setCities(cities);
      setConstantCities(cities);
    });
  };

  const getLocation = () => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      if (location) {
        setPosition(location.coords.latitude, location.coords.longitude);
      } else {
        alert('Pas récupérée');
      }
    })();
  };

  useEffect(() => {
    loadCities();
    getLocation();
    setHasUpdated(false);
  }, []);

  useEffect(() => {
    if (
      cities.length > 0 &&
      latitude !== 0 &&
      longitude !== 0 &&
      hasUpdated === false
    ) {
      const citiesSorted = cities.sort((a, b) => {
        let distanceA = getDistance(
          { latitude: latitude, longitude: longitude },
          {
            latitude: a.latitude,
            longitude: a.longitude
          }
        );
        let distanceB = getDistance(
          { latitude: latitude, longitude: longitude },
          {
            latitude: b.latitude,
            longitude: b.longitude
          }
        );
        return distanceA - distanceB;
      });
      setCities(citiesSorted);
      setConstantCities(citiesSorted);
      setHasUpdated(true);
    }
  });

  return explorateur &&
    resident &&
    cities &&
    latitude &&
    longitude &&
    hasUpdated === true ? (
    <View style={styles.containerModal}>
      <View style={styles.containerCities}>
        <Text style={styles.textTitle}>Choisir une ville</Text>
        <View style={styles.searchBar}>
          <FontAwesome name="search" size={24} color="#f0efef" />
          <TextInput
            style={styles.searchInput}
            onChange={(e) => searchCities(e.nativeEvent.text)}
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
                    onPress={() => setSelectedCity(city)}
                  >
                    <Text
                      style={
                        stylesProps(
                          (cities.indexOf(city) === 0 &&
                            selectedCity === null!) ||
                            (selectedCity && selectedCity.name === city.name)
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
                          (cities.indexOf(city) === 0 &&
                            selectedCity === null!) ||
                            (selectedCity && selectedCity.name === city.name)
                            ? 1
                            : 0.6
                        ).textCity
                      }
                    >
                      {getDistance(
                        {
                          latitude: latitude,
                          longitude: longitude
                        },
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
      {selectedCity !== null ? (
        <View style={styles.containerBaroudeur}>
          <Text style={styles.textTitle}>
            A {selectedCity.name}, vous êtes :
          </Text>
          <View style={styles.containerImage}>
            <TouchableOpacity
              style={styles.imageText}
              onPress={() => selectUserType('Explorateur')}
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
              onPress={() => selectUserType('Résident')}
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
      {selectedCity && userType ? (
        <TouchableOpacity
          style={styles.buttonValider}
          onPress={() =>
            selectedCity !== null && userType !== null
              ? props.setFormDone(selectedCity, userType)
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
