import City from './city.model';

const rootEndpoint = 'https://baroudeurs.herokuapp.com/api/city';

interface city {
  _id: string;
  name: string;
  latitude: number;
  longitude: number;
  polygon: Array<{ longitude: number; latitude: number }>;
}

class EleveApi {
  //Récupère la liste de tous les élèves
  public getAllCities(): Promise<Array<City>> {
    return fetch(rootEndpoint)
      .then((response) => response.json() || [])
      .catch(console.error)
      .then((comArray) => comArray.map(this.createCity));
  }

  //récupère un élève en fonction de l'id
  public getCityFromId(id: number): Promise<City> {
    return fetch(`${rootEndpoint}/${id}`)
      .then((response) => response.json())
      .catch(console.error)
      .then(this.createCity);
  }

  public createCity(city: city): City {
    return new City(
      city._id,
      city.name,
      city.latitude,
      city.longitude,
      city.polygon
    );
  }
}

export default new EleveApi();
