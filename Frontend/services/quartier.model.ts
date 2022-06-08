import PointInteret from './point_interet.model';

export default class Quartier {
  constructor(
    public _id: string,
    public name: String,
    public polygon: Array<{ longitude: number; latitude: number }>,
    public listePI: Array<PointInteret>
  ) {}
}
