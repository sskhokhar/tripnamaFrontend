export class Tag {
  private _tag: string;
  private _usingIds: string[];
  private _id: string;
  public get tag(): string {
		return this._tag;
	}
	public set tag(value: string) {
		this._tag = value;
	}
  public get usingIds(): string[] {
		return this._usingIds;
	}
	public set usingIds(value: string[]) {
		this._usingIds = value;
	}
  public get id(): string {
		return this._id;
	}
	public set id(value: string) {
		this._id = value;
	}
  constructor(tag = '' , usingIds = [] , id = '') {
    this.tag = tag;
    this.usingIds = usingIds;
    this.id = id;
	}
}
