import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
interface ThemeButtonProps {
  theme: { id: number; name: string; color: string };
  selectTheme: Function;
  themeChoisi: Array<string>;
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
            themeChoisi.includes(theme.name)
              ? 'rgba(33, 150, 243, 1)'
              : 'rgba(33, 150, 243, 0.6)'
          ).itemsTheme
        }
        //Ici l'event lorsque l'utilisateur clique sur un thème et que l'on appelle la fonction _choixTheme qui actualise le state de themeChoisi
        onPress={() => selectTheme(theme.name)}
      >
        <Text style={styles('white').text}>{theme.name}</Text>
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
    },
    text: { color: 'white' }
  });
