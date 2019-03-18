import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html'
})
export class ArticleComponent implements OnInit {

  subscribeType;
  subscribeVal;

  isNewArticle = false;
  article;
  date = new Date;
  views = 0;
  author: string = '';
  title: string = '';
  content: string = '';
  category: string = '';
  artId: string = '';
  img: string = '';
  tags = [];
  userMode = true;
  adminMode = false;
  constructor(private router: ActivatedRoute, private articleService: ArticleService, private route: Router) {

  }

  getCurrentArticle() {
    this.isNewArticle = false;
    this.artId = this.router.snapshot.params.id;
    // this.articleService.GetArticleById(this.artId).subscribe(data=>{
    //   this.article = data;
    // });
    this.title = this.article[0].title;
    this.views = this.article[0].views;
    this.author = this.article[0].author;
    this.date = this.article[0].date;
    this.content = this.article[0].content;
    this.category = this.article[0].category;

    this.img = this.article[0].img;
    this.tags = this.article[0].tags;


    this.subscribeType = 'Article';
    this.subscribeVal = this.artId;
  }

  ngDoCheck() {
    if (this.isNewArticle != true) { this.getCurrentArticle(); }
  }
  ngOnInit() {
    this.router.queryParams.subscribe(params => {
      let newArticle = params['newArticle'];
      if (newArticle == 'true') {
        this.isNewArticle = true;
        this.userMode = false;
        this.adminMode = true;
      }
      else {
        
        this.getCurrentArticle();
      }
    })
  }

  redirectToTagResultes(tag) {
    this.route.navigateByUrl(`pages/archive?Tag=${tag}`);
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
