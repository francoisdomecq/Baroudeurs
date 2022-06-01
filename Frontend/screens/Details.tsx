import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Button,
  ActivityIndicator
} from 'react-native';
import { RootStackParamList, NavigationProps } from '../navigation/app-stacks';
import { RouteProp } from '@react-navigation/core';
import Marker from '../services/Marker';
import { MARKERS_DATA } from '../Data/Markers_Data';
interface DetailsProps extends NavigationProps {
  route: RouteProp<RootStackParamList, 'Details'>;
}

interface DetailsState {
  marker: Marker;
}
//Cette fonction affiche les détails d'un point d'intérêt lorsque l'utilisateur sur la fiche descriptive
export default class Details extends Component<DetailsProps, DetailsState> {
  constructor(public props: DetailsProps) {
    super(props);
    this.state = {
      marker: null!
    };
  }

  componentDidMount() {
    const markerId = this.props.route.params.markerId;
    setTimeout(() => {
      const marker = MARKERS_DATA.find((marker) => marker.id === markerId);
      if (marker) this.setState({ marker: marker });
    }, 200);
  }

  render() {
    const { marker } = this.state;
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
