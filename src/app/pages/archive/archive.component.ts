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
  index = 1;
  articles = [];
  sortedArticles: any = [];
  showSubscribeBtn: boolean;

  constructor(
    private articleService: ArticleService,
    private router: Router,
    private route: ActivatedRoute,
    private user: UserService
  ) { }

  // getDate(date: any) {
  //   const dateString = date;
  //   const newDate = new Date(dateString);
  //   return newDate;
  // }
  
  ngOnInit() {
    // this.articleService.GetArticles(this.index).subscribe(data => {
    this.setParams(true, 'News Letter', '', '0', 0);
    //   this.checkIfhasData(data);
    //   //this.sortedArticles = data;
    // });

   
    this.route.queryParams.subscribe(params => {
      const Author = params['Author'];
      const Category = params['Category'];
      const SearchTerm = params['SearchTerm'];
      const Tag = params['Tag'];

      if (Author !== undefined) {
        // this.articleService.GetArticlesByAuthor(Author).subscribe(data => {
        //   this.setParams(true, 'Author', Author, '0', data);
        // });
        if (Author === this.user.userNameAuth) {
          this.showSubscribeBtn = false;
        } else {
          this.showSubscribeBtn = true;
        }
      } else if (Category !== undefined) {



        // this.articleService.GetArticlesByCategory(Category).subscribe(data => {
        //   this.setParams(true, 'Category', sessionStorage.getItem('categorySort'), Category, data);
        // });
      } else if (SearchTerm !== undefined) {

        // this.articleService
        //   .GetArticlesSearchResults(SearchTerm)
        //   .subscribe(data => {
        //     this.setParams(true, 'SearchTerm', SearchTerm, '0', data);
        //   });
        this.resultsNumberFor = `we found ${
          this.sortedArticles.length
          } results for '${SearchTerm}'`;
        this.searchResLbl = `sorry, we could not find '${SearchTerm}' , please search other term...`;
        this.searchTerm = SearchTerm;
      } else if (SearchTerm === undefined) {
        this.resultsNumberFor = '';
      } else if (Tag !== undefined) {
        // this.articleService.GetArticlesByTags(Tag).subscribe(data => {
        //   this.setParams(true, 'Tag', Tag, '0', data);
       // });
        this.resultsNumberFor = `here ${
          this.sortedArticles.length
          } articles with tag '${Tag}'`;
        this.searchResLbl = ``;
        this.searchTerm = '';
      } else {
        // this.articleService.GetAllArticles(this.index).subscribe(data => {
        //   this.setParams(true, 'Daily', 'NewsLetter', '', data);
        // });
      }
    });
  }

  setParams(
    _showSubscribeBtn: boolean,
    _subscribeType: string,
    _subscribeVal: string,
    _defaultSort: string,
    _sortedArticles: any
  ) {
    this.showSubscribeBtn = _showSubscribeBtn;
    this.subscribeType = _subscribeType;
    this.subscribeVal = _subscribeVal;
    if (_sortedArticles !== 0) {
      this.sortedArticles = _sortedArticles;
    }
    if (_defaultSort !== '') {
      this.defaultSort = _defaultSort;
    }
  }
}
