import PointInteret from './point_interet.model';

const rootEndpoint = 'https://baroudeurs.herokuapp.com/api/pointinteret';

interface pointInteret {
  _id: string;
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

class MarkerApi {
  //Récupère la liste de tous les pi
  public getPI(): Promise<Array<PointInteret>> {
    return fetch(rootEndpoint)
      .then((response) => response.json() || [])
      .catch(console.error)
      .then((comArray) => comArray.map(this.createPI));
  }

  //récupère un point intérêt en fonction de l'id
  public getPIFromId(id: string): Promise<PointInteret> {
    return fetch(`${rootEndpoint}/${id}`)
      .then((response) => response.json())
      .catch(console.error)
      .then(this.createPI);
  }

  public createPI(pi: pointInteret): PointInteret {
    return new PointInteret(
      pi._id,
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

export default new MarkerApi();
