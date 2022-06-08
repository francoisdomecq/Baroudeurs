import PointInteret from './point_interet.model';

const rootEndpoint = 'https://baroudeurs.herokuapp.com/api/pointinteret';

interface pointInteret {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  color: string;
  description: string;
  estPrimordial: string;
  theme: string;
  typePI: string;
  img: any;
  imgmarker: any;
  histoire: string;
}

class EleveApi {
  //Récupère la liste de tous les élèves
  public getPI(): Promise<Array<PointInteret>> {
    return fetch(rootEndpoint)
      .then((response) => response.json() || [])
      .catch(console.error)
      .then((comArray) => comArray.map(this.createPI));
  }

  //récupère un élève en fonction de l'id
  public getEleveFromId(id: number): Promise<PointInteret> {
    return fetch(`${rootEndpoint}/${id}`)
      .then((response) => response.json())
      .catch(console.error)
      .then(this.createPI);
  }

  public createPI(pi: pointInteret): PointInteret {
    return new PointInteret(
      pi.id,
      pi.name,
      pi.latitude,
      pi.longitude,
      pi.color,
      pi.description,
      pi.estPrimordial,
      pi.theme,
      pi.typePI,
      pi.img,
      pi.imgmarker,
      pi.histoire
    );
  }
}

export default new EleveApi();
