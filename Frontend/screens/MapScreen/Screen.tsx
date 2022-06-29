import React, { Component, useEffect, useState} from 'react';
import { Appearance } from 'react-native';
import { NavigationProps } from '../../navigation/app-stacks';

import AsyncStorage from '@react-native-async-storage/async-storage';
import FormService from '../../services/form_async';
import City from '../../services/city.model';

import Form from './Form';
import Map from './Map';
import Quartier from '../../services/quartier.model';
import QuartierApi from '../../services/quartier.api_service';

import { AppContext } from '../../utils/context';

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
export default function MapScreenFunction(props: MapProps) {

  

  const [colorScheme, setColorScheme] = useState<string>('');
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [cityPicked, setCityPicked] = useState<City>(null!);
  const [quartiers, setQuartiers] = useState<Array<Quartier>>([]);
  const [userType, setUserType] = useState<string>('');
  const [isFormDone, setIsFormDone] = useState<boolean>(false);

  const selectCity = (city: City) => {
    setCityPicked(city);
    setLocation(city.latitude, city.longitude);
  };

  const modifyUserTypeState = (userType: string) => {
    setUserType(userType);
  };

  const clearForm = () => {
    AsyncStorage.clear();
    setIsFormDone(false);
  };

  const setFormDone = (cityPicked: City, userType: string) => {
    FormService.setFormDone({ cityPicked, userType });
    setIsFormDone(true);
    setCityPicked(cityPicked);
    // cityPicked.quartiers.map((quartierId) => {
    //   QuartierApi.getQuartierFromId(quartierId).then((quartierObject) => {
    //     // setQuartiers([...quartiers, quartierObject]);
    //     console.log(quartierObject.name);
    //   });
    // });
  };

  const findIsFormDone = async () => {
    const Form = await FormService.getFormState();
    if (Form !== undefined) {
      setCityPicked(Form.cityPicked);
      setUserType(Form.userType);
      Form.cityPicked.quartiers.map((quartierId) => {
        QuartierApi.getQuartierFromId(quartierId).then((quartierObject) => {
          let quartiersToAdd = [...quartiers];
          quartiersToAdd.push(quartierObject);
          setQuartiers(quartiersToAdd);
          quartiers.map((quartier) => console.log(quartier.name));
        });
      });
      setIsFormDone(true);
    } else setIsFormDone(false);
  };

  const setLocation = (latitude: number, longitude: number) => {
    setLatitude(latitude);
    setLongitude(longitude);
  };

  useEffect(() => {
    AsyncStorage.clear();
    findIsFormDone();
  }, []);

  return isFormDone ? (
    <Map
      userType={userType}
      latitude={latitude}
      longitude={longitude}
      cityPicked={cityPicked}
      quartiers={quartiers}
      setLocation={setLocation}
      navigation={props.navigation}
    />
  ) : (
    <Form
      userType={userType}
      cityPicked={cityPicked}
      latitude={latitude}
      longitude={longitude}
      setUserType={modifyUserTypeState}
      selectCity={selectCity}
      setFormDone={setFormDone}
      setLocation={setLocation}
    />
  );
}
