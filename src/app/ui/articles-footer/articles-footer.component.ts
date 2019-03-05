import { Component, OnInit, Input } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-articles-footer',
  templateUrl: './articles-footer.component.html',
  styleUrls: ['./articles-footer.component.css']
})
export class ArticlesFooterComponent implements OnInit {

  @Input() category;
  @Input() currentArticleId;

  mostViewd = [];
  mostRecent = [];
  sameCategory = [];
  defaultSort;
  sorts = []
  sortedArticles;

  constructor(private articleService: ArticleService) {

  }

  setFooter() {
    if (this.defaultSort == 'Most Recent') {
      this.sortedArticles = this.articleService.returnMostRecent(3, this.currentArticleId);
    } else if (this.defaultSort == 'Same Category') {
      this.sortedArticles = this.articleService.returnSameCategory(3, this.category, this.currentArticleId);
    } else if (this.defaultSort == 'Most Viewd') {
      this.sortedArticles = this.articleService.returnMostViewd(3, this.currentArticleId);
    }
  }
  sortBy(sortBy) {
    this.defaultSort = sortBy;
    this.setFooter();
  }

  ngOnChanges() {
    this.setFooter();
  }
  ngOnInit() {
    this.defaultSort = 'Most Recent';
    this.sorts = ['Most Recent', 'Same Category', 'Most Viewd']


    //this.sortedArticles = this.mostRecent;
    this.setFooter();
  }

}
