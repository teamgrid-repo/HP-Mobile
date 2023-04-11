export interface IMarker {
  coordinate: ILatLng;
  title?: string;
}

export interface ILatLng {
  lat: number;
  lng: number;
}