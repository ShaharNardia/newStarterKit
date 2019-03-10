import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html'
})
export class ArchiveComponent implements OnInit {
  title: any;
  searchTerm = '';
  searchResLbl: string;
  resultsNumberFor = '';
  categories: any = [];
  defaultSort = 'All';
  subscribeType: string;
  subscribeVal: any;

  articles = [];
  sortedArticles: any = [];
  showSubscribeBtn: boolean;

  constructor(
    private articleService: ArticleService,
    private router: Router,
    private route: ActivatedRoute,
    private user: UserService
  ) {}

  getDate(date: any) {
    const dateString = date;
    const newDate = new Date(dateString);
    return newDate;
  }

  fetchArticles(type: string, param1: string) {
    if (type === 'GetArticles') {
      this.articleService.GetArticles().subscribe(articleData => {
        
        this.sortedArticles = articleData;
        console.log(this.sortedArticles);
      });
    } else if (type === 'GetArticlesByAuthor') {
      this.articleService
        .GetArticlesByAuthor(param1)
        .subscribe(articleData => {});
    } else if (type === 'GetArticlesByCategory') {
      this.articleService
        .GetArticlesByCategory(param1)
        .subscribe(articleData => {});
    }
  }

  ngOnInit() {
    this.fetchArticles('GetArticles', '');
    this.route.queryParams.subscribe(params => {
      const Author = params['Author'];
      const Category = params['Category'];
      const SearchTerm = params['SearchTerm'];
      const Tag = params['Tag'];

      if (Author !== undefined) {
        this.defaultSort = '0';
        this.subscribeType = 'Author';
        this.subscribeVal = Author;

        this.fetchArticles('GetArticlesByAuthor', Author);

        if (Author === this.user.userNameAuth) {
          this.showSubscribeBtn = false;
        } else {
          this.showSubscribeBtn = true;
        }
      } else if (Category !== undefined) {
        this.setParams( true, 'Category', sessionStorage.getItem('categorySort'));
        this.defaultSort = Category;

        this.fetchArticles('GetArticlesByCategory', Category);
      } else if (SearchTerm !== undefined) {
        this.showSubscribeBtn = true;
        this.subscribeType = 'SearchTerm';
        this.subscribeVal = SearchTerm;
        this.defaultSort = 'All';

        this.articleService
          .GetArticlesSearchResults(SearchTerm)
          .subscribe(data => {
            console.log(data);
            this.sortedArticles = data;
          });
        this.resultsNumberFor = `we found ${
          this.sortedArticles.length
        } results for '${SearchTerm}'`;
        this.searchResLbl = `sorry, we could not find '${SearchTerm}' , please search other term...`;
        this.searchTerm = SearchTerm;
      } else if (SearchTerm === undefined) {
        this.resultsNumberFor = '';
      } else if (Tag !== undefined) {
        this.showSubscribeBtn = true;
        this.subscribeType = 'Tag';
        this.subscribeVal = Tag;

        this.defaultSort = 'All';
        this.articleService.GetArticlesByTags(Tag).subscribe(data => {
          this.sortedArticles = data;
        });
        this.resultsNumberFor = `here ${
          this.sortedArticles.length
        } articles with tag '${Tag}'`;
        this.searchResLbl = ``;
        this.searchTerm = '';
      } else {
        this.setParams(true, 'Daily', 'NewsLetter');

        this.articleService.GetArticles().subscribe(data => {
          console.log(data);
          this.sortedArticles = data;
        });
      }
    });
  }

  setParams(
    _showSubscribeBtn: boolean,
    _subscribeType: string,
    _subscribeVal: string
  ) {
    this.showSubscribeBtn = _showSubscribeBtn;
    this.subscribeType = _subscribeType;
    this.subscribeVal = _subscribeVal;
  }
}
