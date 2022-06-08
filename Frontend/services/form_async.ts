import AsyncStorage from '@react-native-async-storage/async-storage';
import Form from './Form.model';

class FormService {
  //Fonction qui permet d'ajouter un objet user de type Eleve (l'utilisateur connecté) à l'async storage
  setFormDone(form: Form) {
    AsyncStorage.setItem('formDone', JSON.stringify(form));
  }

  //Fonction qui permet de supprimer l'objet user de l'async storage
  async deleteForm() {
    await AsyncStorage.removeItem('formDone');
  }

  //fonction qui permet de récupérer l'élève connecté s'il existe ou undefined sinon
  async getFormState(): Promise<Form | undefined> {
    return AsyncStorage.getItem('formDone').then((jsonForm) =>
      jsonForm ? JSON.parse(jsonForm) : undefined
    );
  }
}

export default new FormService();
