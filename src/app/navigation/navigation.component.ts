import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  menuList = [
    "Place",
    "ServiceScore",
    "Curation"
  ]
  selectedMenu:String;
  constructor(private route: ActivatedRoute, private router: Router, private location : Location) { }

  ngOnInit() {
    this.getSelectedMenu()
  }
  getSelectedMenu(){
    console.log(this.router.url);
    console.log(location.href)
     const menu = this.route.url;
     console.log("this is url")
     console.log(menu)
     console.log("---------")
  }
  onSelect(menu:String){
    this.selectedMenu = menu
    console.log(this.selectedMenu)
  }
}
