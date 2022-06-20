import Quartier from './quartier.model';

export default class City {
  constructor(
    public _id: string,
    public name: String,
    public latitude: number,
    public longitude: number,
    public polygon: Array<{ longitude: number; latitude: number }>,
    public quartiers: Array<string>
  ) {}
}
