import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
export default class UserScreen extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        {/*
        - Afficher journal du voyageur
        - Afficher Succes accomplis
        - Afficher quêtes terminées
        - Afficher demandes d'amis
        - Bouton redirection modification profil
        */}
        <Text>Maison</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  }
});
