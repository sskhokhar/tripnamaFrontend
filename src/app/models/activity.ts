import {Location} from './location';
export class Activity {
  private _id: any;
  private _title: string;
  private _startTime: string;
  private _endTime: string;
  private _location: Location;
  private _tags: string[];

	public get tags(): string[] {
		return this._tags;
	}

	public set tags(value: string[]) {
		this._tags = value;
	}

	public get id(): any {
		return this._id;
	}

	public set id(value: any) {
		this._id = value;
	}

	public get title(): string {
		return this._title;
	}

	public set title(value: string) {
		this._title = value;
	}

	public get startTime(): string {
		return this._startTime;
	}

	public set startTime(value: string) {
		this._startTime = value;
	}

	public get endTime(): string {
		return this._endTime;
	}

	public set endTime(value: string) {
		this._endTime = value;
	}

	public get location(): Location {
		return this._location;
	}

	public set location(value: Location) {
		this._location = value;
  }
  // tslint:disable-next-line:max-line-length
  constructor(id: any = '', title: string = '', startTime: string = '', endTime: string = '', location: Location = new Location(), tags: string[] = []) {
    this._id = id;
    this._startTime = startTime;
    this._endTime = endTime;
    this._title = title;
    this._location = location;
    this._tags = tags;
  }
}
