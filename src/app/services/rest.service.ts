import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Http} from '@angular/http';
import {Tag} from '../models/tag';
import {State} from '../models/state';
import {City} from '../models/city';
import {Location} from '../models/location';
import {Country} from '../models/country';
import {AppConfig} from '../../app.config';
import 'rxjs/add/operator/map';
@Injectable()
export class RestService {

  constructor(private http: Http) { }
  get(url) {
    // tslint:disable-next-line:max-line-length
    return this.http.get(url).map(
      (response) => response.json()
    );
  }
}

@Injectable()
export class CountryService {
  constructor(private http: Http) {}
  create(obj): Observable<Country> {
    return this.http.post(AppConfig.apiUrl + '/Countries', obj).map(
      response => {
        const body = response.json();
        return new Country(body);
      }
    );
  }
  find(filter= ''): Observable<Country[]> {
    return this.http.get(AppConfig.apiUrl + '/Countries?filter=' + filter)
    .map(response => response.json())
    .map(body => {
      return body.map(_obj => new Country(_obj));
      }
    );
  }
  findById(id): Observable<Country> {
    return this.http.get(AppConfig.apiUrl + '/Countries/' + id).map(
      response => {
        const body = response.json();
        return new Country(body);
      }
    );
  }
  updateAttributes(obj, id): Observable<Country> {
    return this.http.patch(AppConfig.apiUrl + '/Countries/' + id, obj).map(
      response => {
        const body = response.json();
        return new Country(body);
      }
    );
  }
  create_state(id, obj): Observable<State> {
    return this.http.post(AppConfig.apiUrl + /Countries/ + id + '/states', obj).map(
      response => {
        const body = response.json();
        return new State(body);
      }
    );
  }
  get_states(id): Observable<State[]> {
    return this.http.get(AppConfig.apiUrl + '/Countries/' + id + '/states')
    .map(response => response.json())
    .map(body => {
      return body.map(_obj => new State(_obj));
      }
    );
  }
}

@Injectable()
export class StateService {
  constructor(private http: Http) {}
  create(obj): Observable<State> {
    return this.http.post(AppConfig.apiUrl + '/States', obj).map(
      response => {
        const body = response.json();
        return new State(body);
      }
    );
  }
  find(filter= ''): Observable<State[]> {
    return this.http.get(AppConfig.apiUrl + '/States?filter=' + filter)
    .map(response => response.json())
    .map(body => {
      return body.map(_obj => new Country(_obj));
      }
    );
  }
  findById(id): Observable<State> {
    return this.http.get(AppConfig.apiUrl + '/States/' + id).map(
      response => {
        const body = response.json();
        return new State(body);
      }
    );
  }
  updateAttributes(obj, id): Observable<State> {
    return this.http.patch(AppConfig.apiUrl + '/States/' + id, obj).map(
      response => {
        const body = response.json();
        return new State(body);
      }
    );
  }
  create_city(id, obj): Observable<City> {
    return this.http.post(AppConfig.apiUrl + '/States/' + id + '/cities', obj).map(
      response => {
        const body = response.json();
        return new City(body);
      }
    );
  }
  country(id): Observable<Country> {
    return this.http.get(AppConfig.apiUrl + '/States/' + id + '/country').map(
      response => {
        const body = response.json();
        return new Country(body);
      }
    );
  }
  get_cities(id): Observable<City[]> {

    return this.http.get(AppConfig.apiUrl + '/States/' + id + '/cities')
    .map(response => response.json())
    .map(body => {
      return body.map(_obj => new City(_obj));
      }
    );
  }
}

@Injectable()
export class CityService {
  constructor(private http: Http) {}
  create(obj): Observable<City> {
    return this.http.post(AppConfig.apiUrl + '/Cities', obj).map(
      response => {
        const body = response.json();
        return new City(body);
      }
    );
  }
  find(filter= ''): Observable<City[]> {
    return this.http.get(AppConfig.apiUrl + '/Cities?filter=' + filter)
    .map(response => response.json())
    .map(body => {
      return body.map(_obj => new City(_obj));
      }
    );
  }
  findById(id): Observable<City> {
    return this.http.get(AppConfig.apiUrl + '/Cities/' + id).map(
      response => {
        const body = response.json();
        return new City(body);
      }
    );
  }
  updateAttributes(obj, id): Observable<City> {
    return this.http.patch(AppConfig.apiUrl + '/Cities/' + id, obj).map(
      response => {
        const body = response.json();
        return new City(body);
      }
    );
  }
  create_location(id, obj): Observable<Location> {
    return this.http.post(AppConfig.apiUrl + '/Cities/' + id + '/locations', obj).map(
      response => {
        const body = response.json();
        return new Location(body);
      }
    );
  }
  state(id): Observable<State> {
    return this.http.get(AppConfig.apiUrl + '/Cities/' + id + '/state').map(
      response => {
        const body = response.json();
        return new State(body);
      }
    );
  }
  get_locations(id): Observable<Location[]> {
    return this.http.get(AppConfig.apiUrl + '/Cities/' + id + '/locations')
    .map(response => response.json())
    .map(body => {
      return body.map(_obj => new Location(_obj));
      }
    );
  }
}

@Injectable()
export class LocationService {
  constructor(private http: Http) {}
  find(filter= ''): Observable<Location[]> {
    return this.http.get(AppConfig.apiUrl + '/Locations?filter=' + filter)
    .map(response => response.json())
    .map(body => {
      return body.map(_obj => new Location(_obj));
      }
    );
  }
  findById(id): Observable<Location> {
    return this.http.get(AppConfig.apiUrl + '/Locations/' + id).map(
      response => {
        const body = response.json();
        return new Location(body);
      }
    );
  }
  updateAttributes(obj, id): Observable<Location> {
    return this.http.patch(AppConfig.apiUrl + '/Locations/' + id, obj).map(
      response => {
        const body = response.json();
        return new Location(body);
      }
    );
  }
  state(id): Observable<State> {
    return this.http.get(AppConfig.apiUrl + '/Locations/' + id + '/state').map(
      response => {
        const body = response.json();
        return new State(body);
      }
    );
  }
}
