import React, { createContext, useContext, useState } from 'react';
import City from '../services/city.model';
import Quartier from '../services/quartier.model';
interface AppContextInterface {
  latitude: number;
  longitude: number;
  setPosition: Function;
  cityPicked: City;
  setCityPicked: Function;
  userType: string;
  setUserType: Function;
  quartiers: Array<Quartier>;
  setQuartiers: Function;
}

export const AppContext = createContext<AppContextInterface>({
  latitude: 0,
  longitude: 0,
  setPosition: (latitude: number, longitude: number) => {},
  cityPicked: null!,
  setCityPicked: (city: City) => {},
  userType: '',
  setUserType: (userType: string) => {},
  quartiers: [],
  setQuartiers: (quartiers: []) => {}
});

export class AppProvider extends React.Component {
  state = {
    latitude: 0,
    longitude: 0,
    cityPicked: null!,
    userType: '',
    quartiers: []
  };

  setPosition = (latitude: number, longitude: number) => {
    this.setState({ latitude });
    this.setState({ longitude });
  };

  updateCityPicked = (cityPicked: City) => {
    this.setState({ cityPicked });
  };

  updateUserType = (userType: string) => {
    this.setState({ userType });
  };

  updateQuartiers = (quartier: Quartier) => {
    // this.setState({ quartiers });
    const precedentQuartier: Quartier[] = [...this.state.quartiers];
    precedentQuartier.push(quartier);
    this.setState({ quartiers: precedentQuartier });
  };
  render() {
    return (
      <AppContext.Provider
        value={{
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          setPosition: this.setPosition,
          cityPicked: this.state.cityPicked,
          setCityPicked: this.updateCityPicked,
          userType: this.state.userType,
          setUserType: this.updateUserType,
          quartiers: this.state.quartiers,
          setQuartiers: this.updateQuartiers
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
