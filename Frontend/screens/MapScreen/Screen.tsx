import React, { Component } from 'react';
import { Appearance } from 'react-native';
import { NavigationProps } from '../../navigation/app-stacks';

import Form from './Form';
import Map from './Map';

interface MapProps extends NavigationProps {}

interface MapState {
  colorScheme: string;
  latitude: number;
  longitude: number;
  cityPicked: { name: string; latitude: number; longitude: number };
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

  selectCity = (city: any) => {
    this.setState({
      cityPicked: {
        name: city.name,
        latitude: city.latitude,
        longitude: city.longitude
      }
    });
    this.setState({ latitude: city.latitude });
    this.setState({ longitude: city.longitude });
  };

  setUserType = (userType: string) => {
    this.setState({ userType });
  };

  setFormDone = () => {
    this.setState({ formDone: true });
  };

  setLocation = (latitude: number, longitude: number) => {
    this.setState({ latitude });
    this.setState({ longitude });
  };

  componentDidMount() {
    // this.props.navigation.setOptions({
    //   headerShown: false
    // });
    const colorScheme = Appearance.getColorScheme();
    if (colorScheme) this.setState({ colorScheme });
  }

  render() {
    const { latitude, longitude, cityPicked, formDone, userType } = this.state;
    return formDone ? (
      <Map
        userType={userType}
        latitude={latitude}
        longitude={longitude}
        cityPicked={cityPicked}
        setLocation={this.setLocation}
        navigation={this.props.navigation}
      />
    ) : (
      <Form
        userType={userType}
        cityPicked={cityPicked}
        setUserType={this.setUserType}
        selectCity={this.selectCity}
        setFormDone={this.setFormDone}
      />
    );
  }
}
