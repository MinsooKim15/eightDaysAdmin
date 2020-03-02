import { Injectable } from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {Place} from './place';

@Injectable()
export class PlaceService {

  constructor(private firestore:AngularFirestore){}
  getPlaces(){
    return this.firestore.collection("place").snapshotChanges()
  }
  getPlaceById(placeId : string){
    return this.firestore.collection("place").doc(placeId).ref.get()
  }
  getPlacesByTitle(title : string){
    return this.firestore.collection("place", ref => ref.where('titleKor', '==', title)).snapshotChanges()
  }
  createPlaces(place :Place){
    return this.firestore.collection("place").add(place);
  }
  updatePlaces(place:Place){
    delete place.id;
    this.firestore.doc('place/'+place.id).update(place);
  }
  deletePlace(placeId : string){
    this.firestore.doc('place/' + placeId).delete();
  }

  makeNewId(){
    var today = new Date();
    var year = today.getFullYear();
    var month = String(today.getMonth() + 1).padStart(2, '0');
    var day = String(today.getDate() + 1).padStart(2, '0');
    var hour = String(today.getHours()).padStart(2,'0');
    var minute = String(today.getMinutes()).padStart(2,'0');
    var todayString = year+month+day+hour+minute;
    console.log(todayString)
    // console.log(Math.floor(Math.random()*1000).toString().padStart(4,"0"))
    var randomNumber = Math.floor(Math.random()*1000).toString().padStart(4,"0");
    var id =  "place_"+ todayString + "_" + randomNumber;
    return id
  }
}
