import React, { Component } from 'react';
import {
  ScrollView,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ThemeButton from './ThemeButton';
import Redirect from './Redirect';

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
              <View style={styles.modalHeader}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Ionicons name="close-sharp" size={28} color="#828282" />
                </Pressable>
                <Text style={styles.headerTitle}>
                  Paramètres de l'application
                </Text>
              </View>
              <Text style={styles.modalText}>Choisir un thème</Text>
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
              <View style={{ width: '100%' }}>
                <Redirect
                  firstIcon={
                    <Ionicons name="earth" size={24} color="#46B82F" />
                  }
                  category="Ville"
                  description="Bordeaux"
                  secondIcon={
                    <Ionicons
                      name="chevron-forward"
                      size={24}
                      color="#cbcbcb"
                    />
                  }
                />
              </View>
              <View style={{ width: '100%' }}>
                <Redirect
                  firstIcon={
                    <Ionicons name="person" size={24} color="#46B82F" />
                  }
                  category="Compte"
                  description="Modifer le profil"
                  secondIcon={
                    <Ionicons
                      name="chevron-forward"
                      size={24}
                      color="#cbcbcb"
                    />
                  }
                />
              </View>
              <View style={{ width: '100%' }}>
                <Redirect
                  firstIcon={
                    <Ionicons name="newspaper" size={24} color="#46B82F" />
                  }
                  category="Journal"
                  description="Modifer le journal"
                  secondIcon={
                    <Ionicons
                      name="chevron-forward"
                      size={24}
                      color="#cbcbcb"
                    />
                  }
                />
              </View>
              <View>
                <Text>
                  Succes dans bordeaux{' '}
                  {/*afficher liste succes  bdx scrollview et griser ceux pas obtenus*/}
                </Text>
              </View>
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
    height: '100%',
    width: '100%',
    margin: '2%',
    backgroundColor: '#e7e7e7',
    borderRadius: 15,
    paddingTop: '10%',
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
  modalHeader: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '10%'
  },
  headerTitle: {
    fontSize: 18,
    marginTop: '1%'
  },
  button: {
    borderRadius: 50,
    padding: 2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '6%',
    left: '6%'
  },
  buttonOpen: {
    backgroundColor: '#F194FF'
  },
  buttonClose: {
    backgroundColor: '#fff'
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
