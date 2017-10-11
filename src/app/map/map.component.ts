import { Component, OnInit } from '@angular/core';
import {  MarkerTypeId, ILatLong, IMapOptions, IBox, IMarkerIconInfo, MapTypeId} from 'angular-maps';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  lat = 31.5865753;
  lng = 74.3100394;
  private _markerTypeId = MarkerTypeId
  // a little trick so we can use enums in the template...
  center: ILatLong = {
    latitude : this.lat,
    longitude : this.lng
  }
public _options: IMapOptions = {
  disableBirdseye: true,
  disableStreetside: true,
  navigationBarMode: 1,
  showCopyright : false,
  zoom: 8,
  center: this.center,
  mapTypeId : MapTypeId.road,
  showMapTypeSelector: false
};


public _click() {
 console.log('hello world...');
}
  constructor() { }

  ngOnInit() {
  }

}
