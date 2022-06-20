import Quartier from './quartier.model';
import PointInteret from './point_interet.model';

const rootEndpoint = 'https://baroudeurs.herokuapp.com/api/quartiers';

interface quartier {
  _id: string;
  name: String;
  polygon: Array<{ longitude: number; latitude: number }>;
  listePI: Array<PointInteret>;
}

class EleveApi {
  //Récupère la liste de tous les élèves
  public getQuartiers(): Promise<Array<Quartier>> {
    return fetch(rootEndpoint)
      .then((response) => response.json() || [])
      .catch(console.error)
      .then((comArray) => comArray.map(this.createQuartier));
  }

  //récupère un élève en fonction de l'id
  public getQuartierFromId(id: string): Promise<Quartier> {
    return fetch(`${rootEndpoint}/${id}`)
      .then((response) => response.json())
      .catch(console.error)
      .then(this.createQuartier);
  }

  public createQuartier(quartier: quartier): Quartier {
    return new Quartier(
      quartier._id,
      quartier.name,
      quartier.polygon,
      quartier.listePI
    );
  }
}

export default new EleveApi();
