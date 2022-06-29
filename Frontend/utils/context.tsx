import React, { createContext, useContext, useState } from 'react';

interface AppContextInterface {
  latitude: number;
  longitude: number;
  updateLatitude: Function;
  setLongitude: Function;
}

export const AppContext = createContext<AppContextInterface>({
  latitude: 0,
  longitude: 0,
  updateLatitude: (latitude: number) => {},
  setLongitude: (longitude: number) => {}
});

// const sampleAppContext: AppContextInterface = {
//   latitude: 0,
//   longitude: 0
// };

export class AppProvider extends React.Component {
  state = {
    latitude: 0,
    longitude: 0
  };

  updateLatitude = (latitude: number) => {
    this.setState({ latitude });
  };

  updateLongitude = (longitude: number) => {
    this.setState({ longitude });
  };

  render() {
    return (
      <AppContext.Provider
        value={{
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          updateLatitude: this.updateLatitude,
          setLongitude: this.updateLongitude
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
