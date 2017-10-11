import {Common} from '../models/common';
export class State extends Common {
  private _cityIds: any[];
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
      this._cityIds = object['cityIds'];
}

	public get cityIds(): any[] {
		return this._cityIds;
	}

	public set cityIds(value: any[]) {
		this._cityIds = value;
	}

}
