import {Common} from '../models/common';
export class City extends Common {
  private _locationIds: any[];
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
        this._locationIds = object['locationIds'];
  }

	public get locationIds(): any[] {
		return this._locationIds;
	}

	public set locationIds(value: any[]) {
		this._locationIds = value;
	}

}
