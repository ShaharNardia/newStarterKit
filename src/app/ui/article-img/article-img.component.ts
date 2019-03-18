import { Component, OnInit, Input } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-article-img',
  templateUrl: './article-img.component.html',
  styleUrls: ['./article-img.component.css']
})
export class ArticleImgComponent implements OnInit {
  @Input()
  mediaId;

  ImgSrc;
  constructor(private srv: ArticleService) { }

  ngOnInit() {
    if (this.mediaId > 0) {
      // // this.srv.GetArticleImg(this.mediaId).subscribe(data => {
      // //   this.ImgSrc = data.guid.rendered;
      // });
    }
    else{
      this.ImgSrc = 'https://add2cart.co.il/wp-content/uploads/2017/05/5.jpg';
    }
  }
}
