import {Common} from '../models/common';
export class Location extends Common {
  private _nearby: any[];
  private _spendTime: string;
  private _openTime: string;
  private _closeTime: string;

  constructor(object: object = {}) {
      super(object['id'],
        object['title'],
        object['geoLocation'],
        object['image'],
        object['description'],
        object['likes'],
        object['shares'],
        object['views'],
        object['reviews'],
        object['tags'],
        object['isActive'],
        object['faqs']);
        this._nearby = object['nearby'] || [];
        this._spendTime = object['spendTime'] || '';
        this._openTime = object['openTime'] || '';
        this._closeTime = object['closeTime'] || '';
  }

	public get nearby(): any[] {
		return this._nearby;
	}

	public set nearby(value: any[]) {
		this._nearby = value;
	}

	public get spendTime(): string {
		return this._spendTime;
	}

	public set spendTime(value: string) {
		this._spendTime = value;
	}

	public get openTime(): any {
		return this._openTime;
	}

	public set openTime(value: any) {
		this._openTime = value;
	}

	public get closeTime(): any {
		return this._closeTime;
	}

	public set closeTime(value: any) {
		this._closeTime = value;
	}


}
