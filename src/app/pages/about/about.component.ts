import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html'
})
export class AboutComponent implements OnInit {

  title;
  content;
  img;
  tags = [];
  userMode = true;
  adminMode = false;
  constructor() { }

  ngOnInit() {
    this.title = 'this is the about page';
    this.content = 'this is the about pagethis is the about pagethis is the about pagethis is the about pagethis is the about pagethis is the about pagethis is the about pagethis is the about pagethis is the about pagethis is the about pagethis is the about pagethis is the about pagethis is the about pagethis is the about pagethis is the about pagethis is the about pagethis is the about pagethis is the about pagethis is the about pagethis is the about pagethis is the about pagethis is the about pagethis is the about pagethis is the about pagethis is the about pagethis is the about pagethis is the about pagethis is the about pagethis is the about pagethis is the about pagethis is the about pagethis is the about pagethis is the about pagethis is the about pagethis is the about pagethis is the about pagethis is the about pagethis is the about pagethis is the about pagethis is the about pagethis is the about pagethis is the about page';
    this.img = 'https://ae01.alicdn.com/kf/HTB1Mw38XsfrK1Rjy1Xdq6yemFXaY.jpg';
    this.tags = ['this', 'is', 'the', 'about', 'page'];
  }

  redirectToTagResultes(tag) {
    //to do - redirect to Posts list that have this clicked tag
  }
  checkMode(mode) {
    if (mode !== 'Admin Mode') {
      this.userMode = true;
      this.adminMode = false;
    }
    else {
      {
        this.userMode = false;
        this.adminMode = true;
      }
    }
  }

}
