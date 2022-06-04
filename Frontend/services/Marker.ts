import { Image, ImageProps } from 'react-native';

export default class Marker {
  constructor(
    public id: number,
    public latitude: number,
    public longitude: number,
    public color: string,
    public name: string,
    public description: string,
    public img: any,
    public imgmarker: any,
    public estPrimordial: string,
    public theme: string,
    public typePI: string,
    public histoire: string
  ) {}
}
