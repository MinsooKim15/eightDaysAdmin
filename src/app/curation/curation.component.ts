import { Component, OnInit } from '@angular/core';
import {CurationService} from '../curation.service';
import {Curation} from '../curation';
import {SmallPlace} from '../small-place';



@Component({
  selector: 'app-curation',
  templateUrl: './curation.component.html',
  styleUrls: ['./curation.component.css']
})
export class CurationComponent implements OnInit {
  curations : Curation[];
  searchQuery : string;
  tempId : string;
  constructor(private curationService : CurationService) { }

  ngOnInit() {
    this.curationService.getCurations().subscribe(data => {
      this.curations = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data()) as object
        } as Curation;
      })
    });
    this.tempId = this.curationService.makeNewId()
  }

}
