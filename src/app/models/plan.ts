import {Activity} from './activity';
export class Plan {
  private _name: string;
  private _activities: Activity[];

	public get name(): string {
		return this._name;
	}

	public set name(value: string) {
		this._name = value;
	}

	public get activities(): Activity[] {
		return this._activities;
	}

	public set activities(value: Activity[]) {
		this._activities = value;
	}

	constructor(name: string = '', activityIds: Activity[] = []) {
    this._name = name;
    this._activities = activityIds;
    this._activities.push(new Activity());
  }

}
