import React, { Component } from 'react';
import { Appearance } from 'react-native';
import { NavigationProps } from '../../navigation/app-stacks';

import AsyncStorage from '@react-native-async-storage/async-storage';
import FormService from '../../services/form_async';
import City from '../../services/city.model';

import Form from './Form';
import Map from './Map';
import Quartier from '../../services/quartier.model';
import QuartierApi from '../../services/quartier.api_service';

interface MapProps extends NavigationProps {}

interface MapState {
  colorScheme: string;
  latitude: number;
  longitude: number;
  cityPicked: City;
  quartiers: Array<Quartier>;
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
      quartiers: [],
      userType: null!,
      formDone: false
    };
  }

  selectCity = (city: City) => {
    this.setState({
      cityPicked: city
    });
  };

  setUserType = (userType: string) => {
    this.setState({ userType });
  };

  setFormDone = (cityPicked: City, userType: string) => {
    FormService.setFormDone({ cityPicked, userType });
    this.setState({ formDone: true });
    cityPicked.quartiers.map((quartierId) => {
      QuartierApi.getQuartierFromId(quartierId).then((quartierObject) => {
        this.setState({ quartiers: [...this.state.quartiers, quartierObject] });
      });
    });
  };

  async isFormDone() {
    const Form = await FormService.getFormState();
    if (Form !== undefined) {
      this.selectCity(Form.cityPicked);
      this.setState({ userType: Form.userType });
      this.setState({ formDone: true });
    } else this.setState({ formDone: false });
  }

  setLocation = (latitude: number, longitude: number) => {
    this.setState({ latitude });
    this.setState({ longitude });
  };

  componentDidMount() {
    AsyncStorage.clear();
    this.isFormDone();

    // const colorScheme = Appearance.getColorScheme();
    // if (colorScheme) this.setState({ colorScheme });
  }

  render() {
    const { latitude, longitude, cityPicked, quartiers, formDone, userType } =
      this.state;
    return formDone ? (
      <Map
        userType={userType}
        latitude={latitude}
        longitude={longitude}
        cityPicked={cityPicked}
        quartiers={quartiers}
        setLocation={this.setLocation}
        navigation={this.props.navigation}
      />
    ) : (
      <Form
        userType={userType}
        cityPicked={cityPicked}
        latitude={latitude}
        longitude={longitude}
        setUserType={this.setUserType}
        selectCity={this.selectCity}
        setFormDone={this.setFormDone}
        setLocation={this.setLocation}
      />
    );
  }
}
