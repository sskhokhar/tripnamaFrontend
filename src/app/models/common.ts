export class Common {
  private _id: any;
  private _title: string;
  private _geolocation: object;
  private _image: string;
  private _description: string;
  private _likes: number;
  private _shares: number;
  private _views: number;
  private _reviews: object[];
  private _tags: string[];
  private _isActive: boolean;
  private _faqs: object[];


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

	public get image(): string {
		return this._image;
	}

	public set image(value: string) {
		this._image = value;
	}

	public get geolocation(): object {
		return this._geolocation;
	}

	public set geolocation(value: object) {
		this._geolocation = value;
	}

	public get description(): string {
		return this._description;
	}

	public set description(value: string) {
		this._description = value;
  }
  public get likes(): number {
		return this._likes;
	}

	public set likes(value: number) {
		this._likes = value;
	}

	public get shares(): number {
		return this._shares;
	}

	public set shares(value: number) {
		this._shares = value;
	}

	public get views(): number {
		return this._views;
	}

	public set views(value: number) {
		this._views = value;
	}

	public get reviews(): object[] {
		return this._reviews;
	}

	public set reviews(value: object[]) {
		this._reviews = value;
	}

	public get tags(): string[] {
		return this._tags;
	}

	public set tags(value: string[]) {
		this._tags = value;
	}

	public get isActive(): boolean {
		return this._isActive;
	}

	public set isActive(value: boolean) {
		this._isActive = value;
	}

	public get faqs(): object[] {
		return this._faqs;
	}

	public set faqs(value: object[]) {
		this._faqs = value;
  }

  constructor(
    _id: any = '',
    _title: string = '',
    _geolocation: object = {},
    _image: string = '',
    _description: string = '',
    _likes: number = 0,
    _shares: number = 0,
    _views: number = 0,
    _reviews: object[] = [],
    _tags: string[] = [],
    _isActive: boolean = false,
    _faqs: object[] = []) {
    this._id = _id;
    this._title = _title;
    this._description = _description;
    this._geolocation = _geolocation;
    this._image = _image;
    this._faqs = _faqs;
    this.shares = _shares;
    this._likes = _likes;
    this.views = _views;
    this._tags = _tags;
    this._isActive = _isActive;
    this._reviews = _reviews;
  }
}
