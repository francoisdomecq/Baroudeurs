import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { NavigationProps } from '../navigation/app-stacks';
import Marker from '../services/Marker';

interface FicheDescriptiveProps extends NavigationProps {
  markers: Marker;
}

//Cette fonction permet d'afficher la fiche descriptive d'un marqueur. Elle prend donc en entrée le marqueur à afficher afin d'afficher les différentes informations
export default class FicheDescriptive extends Component<FicheDescriptiveProps> {
  render() {
    const { markers } = this.props;
    return (
      <View style={styles.ficheDescriptive}>
        <View style={styles.title}>
          <Text style={styles.name}>{markers.name}</Text>
        </View>
        <View style={styles.containerImage}>
          <Image style={styles.image} source={markers.img}></Image>
        </View>
        <View style={styles.containerDescription}>
          <Text style={styles.description} numberOfLines={7}>
            {markers.description}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ficheDescriptive: {
    alignSelf: 'flex-start',
    backgroundColor: '#EAE0D5',
    borderRadius: 20,
    width: 350,
    textAlign: 'center'
  },

  title: {
    flex: 1,
    borderColor: '#000',
    backgroundColor: '#70877F',
    borderWidth: 2,
    borderRadius: 20
  },
  name: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold'
  },

  containerImage: {
    flex: 1,
    marginVertical: 10,
    alignItems: 'center'
  },
  image: {
    flex: 1,
    width: 330,
    height: 300,
    borderRadius: 20
  },
  containerDescription: {
    marginBottom: 15,
    textAlign: 'center',
    marginHorizontal: 10
  },
  description: {
    flexWrap: 'wrap',
    color: '#352208',
    borderRadius: 20,
    fontSize: 12
  }
});
