import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

interface RedirectProps {
  firstIcon: JSX.Element;
  category: string;
  description: string;
  secondIcon: JSX.Element;
}

interface RedirectState {}

class Redirect extends Component<RedirectProps, RedirectState> {
  render() {
    const { firstIcon, category, description, secondIcon } = this.props;
    return (
      <TouchableOpacity style={styles.container}>
        <View style={styles.containerTextImage}>
          {firstIcon}
          <Text style={styles.textVille}>{category}</Text>
        </View>
        <View style={styles.containerCity}>
          <Text style={styles.textCity}>{description}</Text>
          {secondIcon}
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '95%',
    height: 40,
    paddingLeft: '2%',
    paddingRight: '2%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    backgroundColor: '#fff'
  },
  containerTextImage: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center'
  },
  textVille: {
    marginLeft: 8,
    color: '#828282',
    fontSize: 16,
    fontWeight: '700'
  },
  containerCity: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center'
  },
  textCity: {
    color: '#46B82F',
    fontSize: 16,
    fontWeight: '500'
  }
});

export default Redirect;
