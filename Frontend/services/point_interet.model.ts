import { Image, ImageProps } from 'react-native';

export default class Marker {
  constructor(
    public id: number,
    public name: string,
    public latitude: number,
    public longitude: number,
    public color: string,
    public description: string,
    public estPrimordial: string,
    public theme: string,
    public typePI: string,
    public img: any,
    public imgmarker: any,
    public histoire: string
  ) {}
}
