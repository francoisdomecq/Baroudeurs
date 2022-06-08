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
import City from '../../services/city.model';
import CityApi from '../../services/city.api_service';

const explorateur = require('../../assets/explorer.png');
const resident = require('../../assets/resident.png');

interface FormProps {
  cityPicked: City;
  userType: string;
  selectCity: Function;
  setUserType: Function;
  setFormDone: Function;
}

interface FormState {
  selectedCity: String;
  selectedUserType: string;
  constantCities: Array<City>;
  cities: Array<City>;
  searchFiled: string;
}

export default class Form extends Component<FormProps, FormState> {
  constructor(public props: FormProps) {
    super(props);
    this.state = {
      selectedCity: '',
      selectedUserType: '',
      searchFiled: '',
      constantCities: [],
      cities: []
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

  componentDidMount() {
    this.loadCities();
  }
  render() {
    const { userType, cityPicked, setUserType, setFormDone } = this.props;
    const { cities, selectedUserType, selectedCity } = this.state;
    console.log(cities);
    return explorateur && resident && cities ? (
      <View style={styles.containerModal}>
        <View style={styles.containerCities}>
          <Text style={styles.textTitle}>
            Sélectionnez la ville que vous souhaitez explorer
          </Text>
          <View
            style={{
              height: 20,
              backgroundColor: '#4FB286',
              width: '80%',
              borderRadius: 10
            }}
          >
            <TextInput
              style={{
                textAlign: 'center'
              }}
              onChange={(e) => this.searchCities(e.nativeEvent.text)}
            />
          </View>
          <ScrollView
            style={styles.containerScrollview}
            contentContainerStyle={{
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {cities.length > 0 ? (
              cities.map((city) => {
                return (
                  <Text
                    style={
                      stylesProps(city.name === selectedCity ? 1 : 0.6).textCity
                    }
                    key={city._id}
                    onPress={() => this.selectCity(city)}
                  >
                    {city.name}
                  </Text>
                );
              })
            ) : (
              <Text style={stylesProps(1).textCity}>
                Aucune vile ne correspond
              </Text>
            )}
          </ScrollView>
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
                  // source={require('../../assets/explorer.png')}
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
      <View>
        <ActivityIndicator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
    backgroundColor: '#4FB286',
    borderRadius: 10,
    marginTop: '3%',
    shadowColor: '#000',
    paddingBottom: '2%'
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
