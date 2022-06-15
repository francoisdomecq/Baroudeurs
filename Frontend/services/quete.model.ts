import PointInteret from './point_interet.model';

export default class Quete {
  constructor(
    public _id: string,
    public name: String,
    public description: String,
    public image: Array<String>,
    public listePI: Array<PointInteret>,
    public progession: Number,
    public score: Number,
    public Succes: String
  ) {}
}

/*  name: { type: String, required: true },
  preview: { type: String, required: true },
  description: { type: String, required: true },
  image: [tabImages],
  listePI: [PISchema],
  progession: { type: Number, required: true },
  score: { type: Number, required: true },
  succes: { type: SuccesSchema, required: true } */
