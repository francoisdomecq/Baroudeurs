export default class Form {
  constructor(
    public cityPicked: { name: string; latitude: number; longitude: number },
    public userType: string,
  ) {}
}
