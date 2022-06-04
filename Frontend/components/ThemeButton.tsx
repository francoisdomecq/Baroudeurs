import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
interface ThemeButtonProps {
  theme: { id: number; name: string; color: string };
  selectTheme: Function;
  themeChoisi: string;
}

interface ThemeButtonState {}

export default class ThemeButton extends Component<
  ThemeButtonProps,
  ThemeButtonState
> {
  render() {
    const { theme, themeChoisi, selectTheme } = this.props;
    return (
      <TouchableOpacity
        key={theme.id}
        style={
          styles(
            themeChoisi === theme.name
              ? 'rgba(255,255,255,1)'
              : 'rgba(255,255,255,0.6)'
          ).itemsTheme
        }
        //Ici l'event lorsque l'utilisateur clique sur un thème et que l'on appelle la fonction _choixTheme qui actualise le state de themeChoisi
        onPress={() => selectTheme(theme.name)}
      >
        <Text>{theme.name}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = (color: string) =>
  StyleSheet.create({
    itemsTheme: {
      flexDirection: 'row',
      backgroundColor: color,
      borderRadius: 20,
      padding: 0,
      paddingHorizontal: 20,
      marginHorizontal: 5,
      height: 22
    }
  });
