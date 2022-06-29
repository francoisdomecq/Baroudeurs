import React, { Component, useEffect, useState, useContext } from 'react';
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

interface ScreenProps extends NavigationProps {}

export default function MapScreenFunction(props: ScreenProps) {
  const { setCityPicked, setUserType, quartiers, setQuartiers } =
    useContext(AppContext);
  const [isFormDone, setIsFormDone] = useState<boolean>(false);

  const clearForm = () => {
    AsyncStorage.clear();
    setIsFormDone(false);
  };

  const setFormDone = (cityPicked: City, userType: string) => {
    FormService.setFormDone({ cityPicked, userType });
    setIsFormDone(true);
    setCityPicked(cityPicked);
    cityPicked.quartiers.map((quartierId) => {
      QuartierApi.getQuartierFromId(quartierId).then((quartierObject) => {
        setQuartiers(quartierObject);
      });
    });
  };

  const findIsFormDone = async () => {
    const Form = await FormService.getFormState();
    if (Form !== undefined) {
      setCityPicked(Form.cityPicked);
      setUserType(Form.userType);
      // Form.cityPicked.quartiers.map((quartierId) => {
      //   QuartierApi.getQuartierFromId(quartierId).then((quartierObject) => {
      //     let quartiersToAdd = [...quartiers];
      //     quartiersToAdd.push(quartierObject);
      //     setQuartiers(quartiersToAdd);
      //     quartiers.map((quartier) => console.log(quartier.name));
      //   });
      // });
      setIsFormDone(true);
    } else setIsFormDone(false);
  };

  useEffect(() => {
    AsyncStorage.clear();
    findIsFormDone();
  }, []);

  return isFormDone ? (
    <Map navigation={props.navigation} />
  ) : (
    <Form setFormDone={setFormDone} />
  );
}
