import { Component, OnInit, Input } from '@angular/core';
import {PostService} from 'src/app/services/postsvc.service';

@Component({
  selector: 'app-post-img',
  templateUrl: './post-img.component.html',
  styleUrls: ['./post-img.component.css']
})
export class PostImgComponent implements OnInit {
  @Input()
  mediaId;

  ImgSrc;
  constructor(private srv: PostService) { }

  ngOnInit() {
    // if (this.mediaId > 0) {
    //   // // this.srv.GetPostImg(this.mediaId).subscribe(data => {
    //   // //   this.ImgSrc = data.guid.rendered;
    //   // });
    // }
    // else{
      this.ImgSrc = 'https://add2cart.co.il/wp-content/uploads/2017/05/5.jpg';
    //}
  }
}
