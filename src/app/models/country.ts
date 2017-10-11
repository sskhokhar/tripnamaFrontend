import {Common} from '../models/common';
export class Country extends Common {
  private _stateIds: any[];
  constructor(object: object) {
      super(object['id'],
        object['title'],
        object['geolocation'],
        object['image'],
        object['description'],
        object['likes'],
        object['shares'],
        object['views'],
        object['reviews'],
        object['tags'],
        object['isActive'],
        object['faqs']);
        this._stateIds = object['stateIds'];
  }

	public get stateIds(): any[] {
		return this._stateIds;
	}

	public set stateIds(value: any[]) {
		this._stateIds = value;
	}

}
