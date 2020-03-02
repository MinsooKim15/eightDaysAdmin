import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import {NgbModal, ModalDismissReasons,NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Place} from '../place';
import {PlaceService} from '../place.service';
import {SmallPlace} from '../small-place';

@Component({
  selector: 'app-place-pop-up',
  templateUrl: './place-pop-up.component.html',
  styleUrls: ['./place-pop-up.component.css']
})
export class PlacePopUpComponent implements OnInit {
  closeResult : string;
  rank : number;
  selectedPlace : Place;
  query : string;
  places : Place[];
  modalReference : any;
  smallPlace : SmallPlace;

  @Output() messageEvent = new EventEmitter<SmallPlace>();

  constructor(private modalService: NgbModal, private placeService:PlaceService) { }
  ngOnInit(): void {
  }
  open(content){
    console.log("Open(content)")
  this.modalReference = this.modalService.open(content, {ariaLabelledBy:'modal-basic-title'})
  this.modalReference.result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string{
    if (reason === ModalDismissReasons.ESC){
      return 'by pressing ESC';
    }else if ( reason === ModalDismissReasons.BACKDROP_CLICK){
      return 'by clicking on a backdrop';
    }else{
      return `with: ${reason}`;
    }
  }
  search(){
    console.log(this.query)
    this.placeService.getPlacesByTitle(this.query).subscribe(data => {
      this.places = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data()) as object
        } as Place;
      });
    });
  };
  selectPlace(place : Place){
    this.selectedPlace = place;
  }
  saveClicked(){
    this.smallPlace = this.makeSmallPlace();
    this.messageEvent.emit(this.smallPlace)
    this.modalReference.close()
  }
  makeSmallPlace():SmallPlace{
    var smallPlace = {
      // img_url : this.selectedPlace.imgUrl,나중에 이미지 다 입력하면 활성화 합시다 ㅜㅜ
      place_id : this.selectedPlace.id,
      score : this.selectedPlace.score,
      subtitle : this.selectedPlace.subtitle,
      title_kor : this.selectedPlace.titleKor,
      rank : this.rank
    }
    return smallPlace
  }
}
