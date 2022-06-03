import { Component, ReactNode } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';

const explorateur = require('../../assets/explorer.png');
const resident = require('../../assets/resident.png');

interface FormProps {
  cityPicked: { name: string; latitude: number; longitude: number };
  userType: string;
  selectCity: Function;
  setUserType: Function;
  setFormDone: Function;
}

interface FormState {
  selectedCity: string;
  selectedUserType: string;
}

export default class Form extends Component<FormProps, FormState> {
  constructor(public props: FormProps) {
    super(props);
    this.state = {
      selectedCity: '',
      selectedUserType: ''
    };
  }

  selectCity(city: any) {
    this.setState({ selectedCity: city.name });
    this.props.selectCity(city);
  }

  selectUserType(user: string) {
    this.setState({ selectedUserType: user });
    this.props.setUserType(user);
  }
  render() {
    const cities = [
      {
        id: 1,
        name: 'Bordeaux',
        latitude: 44.837789,
        longitude: -0.57918
      },
      {
        id: 2,
        name: 'Marseille',
        latitude: 43.2961743,
        longitude: 5.3699525
      },
      {
        id: 3,
        name: 'Paris',
        latitude: 48.856614,
        longitude: 2.3522219
      },
      {
        id: 4,
        name: 'Lyon',
        latitude: 45.7578137,
        longitude: 4.8320114
      },
      {
        id: 5,
        name: 'Lilles',
        latitude: 59.9566415,
        longitude: 11.0476837
      }
    ];
    const { userType, cityPicked, setUserType, setFormDone } = this.props;

    return explorateur && resident ? (
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
                  style={
                    stylesProps(city.name === this.state.selectedCity ? 1 : 0.6)
                      .textCity
                  }
                  key={city.id}
                  onPress={() => this.selectCity(city)}
                >
                  {city.name}
                </Text>
              );
            })}
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
                    stylesProps(
                      this.state.selectedUserType === 'Explorateur' ? 0.6 : 1
                    ).image
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
                    stylesProps(
                      this.state.selectedUserType === 'Résident' ? 0.6 : 1
                    ).image
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
                ? setFormDone(cityPicked,userType)
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
    shadowColor: '#000'
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
