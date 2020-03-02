import { Injectable } from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {SmallPlace} from './small-place';
import {Curation} from './curation';

@Injectable()
export class CurationService {

  constructor(private firestore:AngularFirestore){}
  getCurations(){
    return this.firestore.collection("curation").snapshotChanges()
  }
  getCurationById(curationId : string){
    console.log(curationId)
    return this.firestore.collection("curation").doc(curationId).ref.get()
  }
  createCurations(curation :Curation){
    return this.firestore.collection("curation").add(curation);
  }
  updateCurations(curation:Curation){
    var curationId = curation.id;
    delete curation.id;
    this.firestore.doc('curation/'+curationId).update(curation);
    curation.id = curationId;
  }
  deleteCuration(curationId : string){
    this.firestore.doc('curation/' + curationId).delete();
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
    var id =  "cu_"+ todayString + "_" + randomNumber;
    return id
  }
}
