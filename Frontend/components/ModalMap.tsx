import React, { Component } from 'react';
import {
  ScrollView,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View
} from 'react-native';
import ThemeButton from './ThemeButton';

interface ModalMapProps {
  setModalVisible: Function;
  modalVisible: boolean;
  selectTheme: Function;
  themeChoisi: Array<string>;
}

import { THEMES } from '../Data/Theme';

interface ModalMapState {}

export default class ModalMap extends Component<ModalMapProps> {
  constructor(public props: ModalMapProps) {
    super(props);
  }
  render() {
    const { modalVisible, setModalVisible, selectTheme, themeChoisi } =
      this.props;
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello World!</Text>
              <View style={styles.containerScrollView}>
                <ScrollView
                  horizontal
                  scrollEventThrottle={1}
                  showsHorizontalScrollIndicator={false}
                  style={styles.scrollview}
                >
                  {
                    //On récupère ici les différents thèmes que nous avons défini dans Themes.js
                    THEMES.map((theme) => (
                      <ThemeButton
                        theme={theme}
                        selectTheme={selectTheme}
                        themeChoisi={themeChoisi}
                      />
                    ))
                  }
                </ScrollView>
              </View>

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalView: {
    height: '70%',
    width: '85%',
    margin: '2%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: '2%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: '#F194FF'
  },
  buttonClose: {
    backgroundColor: '#2196F3'
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  },
  containerScrollView: {
    width: '100%'
  },
  scrollview: {
    paddingLeft: '1%',
    paddingRight: '1%'
  }
});
