import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, ActivityIndicator } from 'react-native';
import { RootStackParamList, NavigationProps } from '../navigation/app-stacks';
import { RouteProp } from '@react-navigation/core';

import MarkerApi from '../services/point_interet.api_service';
import Marker from '../services/point_interet.model';

interface DetailsProps extends NavigationProps {
  route: RouteProp<RootStackParamList, 'Details'>;
}

export default function DetailsFunction(props: DetailsProps) {
  const [marker, setMarker] = useState<Marker>(null!);

  useEffect(() => {
    const markerId = props.route.params.markerId;
    setTimeout(() => {
      MarkerApi.getPIFromId(markerId).then((marker) => setMarker(marker));
    }, 200);
  }, []);

  return marker ? (
    <View>
      <View style={styles.detail}>
        <View>
          <Text style={styles.name}>{marker.name}</Text>
        </View>
        <View style={styles.containerImage}>
          <Image style={styles.image} source={marker.img}></Image>
        </View>
        <View>
          <Text style={styles.title}>Histoire</Text>
          <Text>{marker.histoire} </Text>
        </View>
      </View>
    </View>
  ) : (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} color="#000000" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  detail: {
    textAlign: 'center',
    flexDirection: 'column'
  },
  name: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold'
  },

  containerImage: {
    marginVertical: 10,
    alignItems: 'center'
  },
  title: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold'
  },
  image: {
    width: 300,
    height: 220
  }
});
