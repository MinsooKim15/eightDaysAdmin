import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { NavigationComponent } from './navigation/navigation.component';
import { CurationComponent } from './curation/curation.component';
import { CurationDetailComponent } from './curation-detail/curation-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { CurationService } from './curation.service';
import { PlaceService } from './place.service';
import { PlaceComponent } from './place/place.component';
import { PlaceDetailComponent } from './place-detail/place-detail.component';


import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment';
import { PlacePopUpComponent } from './place-pop-up/place-pop-up.component';

const appRoutes: Routes = [
  { path: '', component: CurationComponent },
  {path:'curation-detail/:id', component:CurationDetailComponent},
  {path: 'Place', component : PlaceComponent},
  {path: 'Curation', component : CurationComponent}
];

@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    RouterModule.forRoot(
      appRoutes,
    )
    ],
  declarations: [ AppComponent, NavigationComponent, PlaceComponent, PlaceDetailComponent, CurationComponent, CurationDetailComponent, PlacePopUpComponent ],
  bootstrap:    [ AppComponent ],
  providers: [CurationService,PlaceService]
})
export class AppModule { }
