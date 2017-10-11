import {Plan} from './plan';
import {Common} from './common';
export class Itinery extends Common {
  private _personsCount: number;
  private _startDate: Date;
  private _endDate: Date;
  private _plans: Plan[];
  private _countryId: string;
  private _stateId: string;
  private _cityId: string;

	public get countryId(): string {
		return this._countryId;
	}

	public set countryId(value: string) {
		this._countryId = value;
	}

	public get stateId(): string {
		return this._stateId;
	}

	public set stateId(value: string) {
		this._stateId = value;
	}

	public get cityId(): string {
		return this._cityId;
	}

	public set cityId(value: string) {
		this._cityId = value;
	}

	public get personsCount(): number {
		return this._personsCount;
	}

	public set personsCount(value: number) {
		this._personsCount = value;
	}

	public get startDate(): Date {
		return this._startDate;
	}

	public set startDate(value: Date) {
		this._startDate = value;
	}
	public get endDate(): Date {
		return this._endDate;
	}
	public set endDate(value: Date) {
		this._endDate = value;
	}
	public get plans(): Plan[] {
		return this._plans;
	}
	public set plans(value: Plan[]) {
		this._plans = value;
	}
  constructor(_object: object = {}) {
    super(_object['id'],
      _object['title'],
      _object['geoLocation'],
      _object['image'],
      _object['description'],
      _object['likes'],
      _object['shares'],
      _object['views'],
      _object['reviews'],
      _object['tags'],
      _object['isActive'],
      _object['faqs']);
      this._personsCount = _object['personsCount'] || 0;
      this._endDate = _object['endDate'];
      this._startDate = _object['startDate'] || new Date();
      this._countryId = _object['countryId'] || '';
      this._stateId = _object['stateId'] || '';
      this._cityId = _object['cityId'] || '';
      if (_object['plans']) {
        const temp = [];
        _object['plans'].forEach(element => {
          temp.push(new Plan(element.name, element.activityIds));
        });
        this._plans = temp;
      } else {
        this._plans = [];
        this._plans.push(new Plan());
      }
  }
}
