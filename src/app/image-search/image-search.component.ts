import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import {RestService} from '../services/rest.service';
import {AppConfig} from '../../app.config';
@Component({
  selector: 'app-image-search',
  templateUrl: './image-search.component.html',
  styleUrls: ['./image-search.component.scss']
})
export class ImageSearchComponent implements OnInit {
  private URL = AppConfig.googleSearchURL;
  private API_KEY = AppConfig.googleSearchAPI;
  private SEARCHENGINE = AppConfig.googleSearchEngine;
  searchStarted = false;
  _images = [];
  selectedImage;
  imageSearchForm = new FormGroup({
    searchText : new FormControl('', [Validators.required, Validators.minLength(3)])
  });
  constructor(
    public dialogRef: MatDialogRef<ImageSearchComponent>,
  private http: RestService) { }
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {

  }
  search() {
    const query = this.imageSearchForm.get('searchText').value;
    // tslint:disable-next-line:max-line-length
    this.searchStarted = true;
    this._images = [];
    // tslint:disable-next-line:max-line-length
    this.http.get(this.URL + 'key=' + this.API_KEY + '&cx=' + this.SEARCHENGINE + '&q=' + query + '&searchType=image&alt=json&imgSize=large&imgType=photo').subscribe(
      data => {
        console.log(data);
        this.searchStarted = false;
        data.items.forEach(item => {
          const a = item.link
          this._images.push(a);
        });
      }
    );
  }
  selectImage(event, url) {
    this.selectedImage = url;
  }
  isSelected(url) {
    return this.selectedImage === url;
  }
  insertImage() {
    this.dialogRef.close(this.selectedImage);
  }
}
