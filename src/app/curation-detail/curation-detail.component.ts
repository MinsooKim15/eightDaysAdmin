import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import {Curation} from '../curation';
import {CurationService} from '../curation.service';
import {SamllPlace} from '../small-place';

@Component({
  selector: 'app-curation-detail',
  templateUrl: './curation-detail.component.html',
  styleUrls: ['./curation-detail.component.css']
})
export class CurationDetailComponent implements OnInit {
  curation : Curation;
  isNew : Boolean;
  constructor(
    private route: ActivatedRoute,
    private curationService: CurationService,
    private location: Location
  ) {
  }

  ngOnInit() {
    this.getCuration();
  }
  getCuration(): void{
    const id = this.route.snapshot.paramMap.get('id');
    console.log("this is id")
    console.log(id);

    this.curationService.getCurationById(id).then((doc)=>{if(doc.exists){
      const data = doc.data()
      const tempCuration = {
        id : id,
        rank : data.rank,
        title : data.title,
        list_of_places : data.list_of_places
      };
      this.isNew = false
      console.log(tempCuration)
      this.curation = tempCuration

    }else{
      const tempCuration = {
        id : id,
        rank : null,
        title : null,
        list_of_places : null
      }
      this.isNew = true
      console.log(tempCuration)
      this.curation = tempCuration
    }
    })
  }
  receiveMessage($event){
    console.log("recievedd!!!")
    console.log($event)
    if (this.curation.list_of_places){
      this.curation.list_of_places.push($event)
    }else{
      this.curation.list_of_places = [$event]
    }
  }
  saveClicked(){
    if (this.isNew){
      console.log("newData")
      this.curationService.createCurations(this.curation)
    }else{
      console.log("updateData")
      console.log(this.curation)
      this.curationService.updateCurations(this.curation)
    }
  }
  deleteClicked(place: SmallPlace){
    // Item to remove
    this.curation.list_of_places.forEach( (item, index) => {
      if(item === place) this.curation.list_of_places.splice(index,1);
    });
    console.log(this.curation)
  }

}
