import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import {MatDialog, MatDialogRef, MatDialogConfig, MatChipInputEvent} from '@angular/material';
import {ImageSearchComponent} from '../image-search/image-search.component';
import {Itinery} from '../models/itinery';
import {Activity} from '../models/activity';
import {Plan} from '../models/plan';
import {Country} from '../models/country';
import {State} from '../models/state';
import {City} from '../models/city';
import {Location} from '../models/location';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import {EmptyObservable} from 'rxjs/observable/EmptyObservable';
import {CountryService, StateService, CityService} from '../services/rest.service';
import { ChangeDetectionStrategy } from '@angular/core';
const COMMA = 188;
const ENTER = 13;
@Component({
  selector: 'app-make-plan',
  templateUrl: './make-plan.component.html',
  styleUrls: ['./make-plan.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class MakePlanComponent implements OnInit {
  visible: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;
  separatorKeysCodes = [ENTER, COMMA];
  isCreateTrip = false;
  image;
  itinery: Itinery;
  step = 0;
  itineryForm: FormGroup;
  startDate;
  countries: Country[] = [];
  states: State[] = [];
  cities: City[] = [];
  locations: Location[] = [];
  filteredStates: Observable<State[]>;
  filteredCities: Observable<City[]>;
  countrySearch = false;
  minDate = new Date();
  tagInputCodes = [COMMA];
  // tslint:disable-next-line:max-line-length
  constructor(public dialog: MatDialog, private _CountryService: CountryService, private _StateService: StateService, private _CityService: CityService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.itinery = new Itinery();
    this.itineryForm = this.formBuilder.group({
      title : ['', [Validators.required, Validators.minLength(10)]],
      fromDate : [],
      toDate: [],
      persons: ['1', Validators.min(1)],
      countryInp: ['', [this.countryValidator.bind(this)]],
      stateInp : ['', [this.stateValidator.bind(this)]],
      cityInp: [],
      plans : this.formBuilder.array([
        this.formBuilder.group({
            title: ['', [Validators.required]],
            activities: this.formBuilder.array([
              this.formBuilder.group({
                title: ['', Validators.required],
                location: ['', Validators.required],
                startTime: ['', Validators.required],
                endTime: ['', Validators.required],
                tags: ['', Validators.required]
              })
            ])
        })
      ])
    });

  }
  uploadImage(): void {
    const dialogRef = this.dialog.open(ImageSearchComponent, {
      width: '50%',
      height: '670px'
    });
    dialogRef.afterClosed().subscribe(
      data => {
        console.log(data);
        if (data) {
          this.image = data;
        }
      }
    );
  }
  changeDate(e) {
    this.itinery.startDate = e.value;
  }
  createTrip() {
    this.isCreateTrip = !this.isCreateTrip;
    this.itineryForm.get('fromDate').setValue(this.itinery.startDate);
    this.startDate = this.itinery.startDate;
    // this.itinery.plans[0].activities.push(new Activity());
    this.itineryForm.get('countryInp').valueChanges.debounceTime(50).subscribe(
      data => {
        if (!this.itineryForm.get('countryInp').valid) {
          console.log('ifInvalid');
          this.itinery.countryId = data;
        }
        this.countrySearch = true;
        if (data.length > 0) {
          // tslint:disable-next-line:max-line-length
          this._CountryService.find('%7B%22where%22%20%3A%20%7B%22title%22%20%3A%20%7B%22regexp%22%20%3A%20%22%2F%5E' + data + '%2Fig%22%7D%7D%7D').subscribe(
            response => {
              this.countrySearch = false;
              this.countries = response;
            }
          );
        } else {
          this.countrySearch = false;
        }
      }
    );
    this.filteredStates = this.itineryForm.get('stateInp').valueChanges
    .startWith(null)
    .map(name => this.filterStates(name));
    this.filteredCities = this.itineryForm.get('cityInp').valueChanges
    .startWith(null)
    .map(name => this.filterCities(name));

    this.itineryForm.get('stateInp').disable();
    this.itineryForm.get('cityInp').disable();
  }
  displayCountry(cntry: Country) {
    return cntry ? cntry.title : cntry;
  }
  displayState(state: State) {
    return state ? state.title : state;
  }
  displayCity(city: City) {
    return city ? city.title : city;
  }
  cancelTrip() {
    this.isCreateTrip = !this.isCreateTrip;
  }
  selectCountry(e) {
    this.itinery.countryId = e.option.value.id;
    this.itineryForm.get('countryInp').updateValueAndValidity({
      onlySelf: true
    });
    this._CountryService.get_states(this.itinery.countryId).subscribe(
      response => {
        this.states = response;
        this.itineryForm.get('stateInp').enable();
      }
    );
  }
  selectState(e) {
    this.itinery.stateId = e.option.value.id;
    this._StateService.get_cities(this.itinery.stateId).subscribe(
      response => {
        console.log(this.itinery.stateId);
        this.cities = response;
        this.itineryForm.get('cityInp').enable();
      }
    );
  }
  selectCity(e) {
    this.itinery.cityId = e.option.value.id;
    this._CityService.get_locations(this.itinery.cityId).subscribe(
      response => {
        console.log(response);
        this.locations = response;
      }
    );
  }
  selectLocation(e, activityIndex, planIndex) {
    this.itinery.plans[planIndex].activities[activityIndex].location = e.option.value;
    console.log(this.itinery.plans[planIndex].activities[activityIndex].location);
  }
  addActivity(planIndex) {
    const activitesArr = <FormArray>this.itineryForm.controls['plans']['controls'][planIndex]['controls']['activities']['controls'];
    const newGroup = this.formBuilder.group({
      title: ['', Validators.required],
      location: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      tags: ['', Validators.required]
    });
    console.log(activitesArr);
    activitesArr.push(newGroup);
    console.log(this.itineryForm);
    this.itinery.plans[planIndex].activities.push(new Activity());
  }
  addDay() {
    const planArray = <FormArray>this.itineryForm.controls['plans'];
    const newGroup = this.formBuilder.group({
      title: ['', [Validators.required]],
      activities: this.formBuilder.array([
        this.formBuilder.group({
          title: ['', Validators.required],
          location: ['', Validators.required],
          startTime: ['', Validators.required],
          endTime: ['', Validators.required],
          tags: ['', Validators.required]
        })
      ])
    });
    planArray.push(newGroup);
    this.itinery.plans.push(new Plan());
  }

  getDate(no) {
    return new Date(new Date().getTime() + (no * 24 * 60 * 60 * 1000));
  }
  private countryValidator() {
    console.log('in country validator');
    console.log(this.countries);
    if (this.countries.length > 0) {

      let c = 0;
      this.countries.forEach(country => {
       let a = this.itineryForm.get('countryInp').value;
       if (typeof a !== 'string') {
         a = a.title;
       }
       // tslint:disable-next-line:max-line-length
       if (country.id === this.itinery.countryId && a === country.title.toLowerCase()) {
         c++;
       }
      });
      return c > 0 ? null : {message : 'No country found.'}
    }
    return {message : 'No country found.'};
  }
  private stateValidator() {
    if (this.states.length > 0) {
      let c = 0;
      this.states.forEach(state => {
       if (state.id === this.itinery.stateId) {
         c++;
       }
      });
      return c > 0 ? null : {message : 'No state found.'}
    }
    return {message : 'No state found.'};
  }
  private cityValidator() {
    console.log('cityValidator');
    if (this.cities.length > 0) {
      let c = 0;
      this.cities.forEach(city => {
       if (city.id === this.itinery.cityId) {
         c++;
       }
      });
      return c > 0 ? null : {message : 'No city found.'}
    }
    return {message : 'No city found.'};
  }
  private filterStates(val: string) {
    if (typeof val === 'string') {
      return val ? this.states.filter(s => s.title.toLowerCase().indexOf(val.toLowerCase()) === 0)
      : this.states;
    }
    return;
  }
  private filterCities(val: string) {
    if (typeof val === 'string') {
      return val ? this.cities.filter(s => s.title.toLowerCase().indexOf(val.toLowerCase()) === 0)
      : this.cities;
    }
    return;
  }
  private filterLocations(val: string) {
    if (typeof val === 'string') {
      return val ? this.locations.filter(s => s.title.toLowerCase().indexOf(val.toLowerCase()) === 0)
      : this.locations;
    }
    return;
  }

  addTag(event: MatChipInputEvent, activityIndex, planIndex): void {
    const input = event.input;
    let value = event.value;
    if ((value || '').trim()) {
      value = value.replace(' ', '-');
      this.itinery.plans[planIndex].activities[activityIndex].tags.push(value);
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeTag(tagIndex, activityIndex, planIndex): void {
    this.itinery.plans[planIndex].activities[activityIndex].tags.splice(tagIndex, 1);
  }
}
