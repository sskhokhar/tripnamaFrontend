  /// <reference path="../../node_modules/bingmaps/scripts/MicrosoftMaps/Microsoft.Maps.All.d.ts" />
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from './app.component';
import {HttpModule} from '@angular/http';
import {
  MatStepperModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule} from '@angular/material';
import { HomeComponent } from './home/home.component';
import {MapComponent} from './map/map.component';
import { FooterComponent } from './footer/footer.component';
// import { AgmCoreModule } from '@agm/core';
import { MakePlanComponent } from './make-plan/make-plan.component';
import { RestService, CountryService, StateService, CityService } from './services/rest.service';
// tslint:disable-next-line:max-line-length
import { MapModule, MapAPILoader, GoogleMapAPILoaderConfig, GoogleMapAPILoader, WindowRef, DocumentRef, MapServiceFactory, GoogleMapServiceFactory } from 'angular-maps';
import { ImageSearchComponent } from './image-search/image-search.component';
import { DateTimePickerModule } from 'ng-pick-datetime';
  const appRoutes: Routes = [
    {
      path : '',
      component: HomeComponent
    }, {
      path : 'make-my-plan',
      component : MakePlanComponent
    }
  ];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    MapComponent,
    MakePlanComponent,
    ImageSearchComponent
  ],
  imports: [

    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyBvcwvYC2ukpD0mVQZG9ZBVwMx8-nRa57w'
    // }),
    DateTimePickerModule,
    HttpModule,
    BrowserModule.withServerTransition({appId: 'universal-cli'}),
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatStepperModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    MapModule.forRootGoogle(),
  ],
  providers: [

    RestService,
    CountryService,
    StateService,
    CityService,
    {
      provide: MapAPILoader, deps: [], useFactory: GoogleMapServiceProviderFactory
    }
  ],
  entryComponents: [
    ImageSearchComponent
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
export function GoogleMapServiceProviderFactory() {
  const gc: GoogleMapAPILoaderConfig = new GoogleMapAPILoaderConfig();
  gc.apiKey = 'AIzaSyBvcwvYC2ukpD0mVQZG9ZBVwMx8-nRa57w';
    // replace with your google map key
    // the usage of this key outside this plunker is illegal.
  gc.enableClustering = true;
  return new GoogleMapAPILoader(gc, new WindowRef(), new DocumentRef());
}
