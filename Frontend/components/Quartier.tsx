import React, { Component } from 'react';
import { View } from 'react-native';
import { Polygon, Marker } from 'react-native-maps';
import QuartierModel from '../services/quartier.model';
import { getDistance, getCenter, isPointInPolygon } from 'geolib';
import * as Location from 'expo-location';

interface QuartierProps {
  quartier: QuartierModel;
  position: { latitude: number; longitude: number };
}

interface QuartierState {}

class Quartier extends React.Component<QuartierProps, QuartierState> {
  componentDidMount() {}
  render() {
    const { quartier, position } = this.props;
    const isInPolygon = isPointInPolygon(position, quartier.polygon);
    return (
      <View>
        <Polygon
          coordinates={quartier.polygon}
          strokeWidth={1}
          fillColor={isInPolygon ? 'rgba(255,0,255,0.5)' : 'rgba(0,0,0,0)'}
          tappable={true}
          zIndex={1}
        />
      </View>
    );
  }
}

export default Quartier;
