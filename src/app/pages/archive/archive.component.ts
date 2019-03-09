import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html'
})
export class ArchiveComponent implements OnInit {
  title;
  searchTerm = '';
  searchResLbl;
  resultsNumberFor = '';
  categories: any = [];
  defaultSort = 'All';
  subscribeType;
  subscribeVal;

  articles = [];
  sortedArticles: any = [];
  showSubscribeBtn: boolean;

  constructor(
    private articleService: ArticleService,
    private router: Router,
    private route: ActivatedRoute,
    private user: UserService
  ) {}

  getDate(date) {
    const dateString = date;
    const newDate = new Date(dateString);
    return newDate;
  }

  SetImages(articleData) {
    this.sortedArticles = [];
    for (let index = 0; index < articleData.length; index++) {
      this.articleService
        .GetArticleImg(articleData[index].featured_media)
        .subscribe(_featured_media => {
          this.sortedArticles.push({
            title: articleData[index].title.rendered,
            date: articleData[index].date,
            category: articleData[index].categories[0],
            author: articleData[index].author,
            img: _featured_media.guid.rendered
          });
        });
    }
  }
  fetchArticles(type, param1) {
    if (type == 'GetArticles') {
      this.articleService.GetArticles().subscribe(articleData => {
        this.SetImages(articleData);
      });
    } else if (type == 'GetArticlesByAuthor') {
      this.articleService.GetArticlesByAuthor(param1).subscribe(articleData => {
        this.SetImages(articleData);
      });
    } else if (type == 'GetArticlesByCategory') {
      this.articleService
        .GetArticlesByCategory(param1)
        .subscribe(articleData => {
          this.SetImages(articleData);
        });
    }
  }
  setCategories(catdata) {
    this.categories = catdata;
    let obj = this.categories[0];
    this.categories[0] = { id: 0, name: 'All' };
    this.categories.push(obj);
    this.defaultSort = '0';
  }
  ngOnInit() {
    this.articleService.GetAllCategories().subscribe(catdata => {
      this.setCategories(catdata);

      this.fetchArticles('GetArticles', '');

      this.route.queryParams.subscribe(params => {
        const Author = params['Author'];
        const Category = params['Category'];

        const SearchTerm = params['SearchTerm'];
        const Tag = params['Tag'];

        if (Author !== undefined) {
          this.defaultSort = 'All';
          this.fetchArticles('GetArticlesByAuthor', Author);
          this.subscribeType = 'Author';
          this.subscribeVal = Author;
          if (Author == this.user.userNameAuth) {
            this.showSubscribeBtn = false;
          } else {
            this.showSubscribeBtn = true;
          }
        } else if (Category !== undefined) {
          console.log(Category);
          this.showSubscribeBtn = true;
          this.subscribeType = 'Category';
          let cat = this.categories.filter(x => {
            return x.id == Category;
          })[0];
          this.subscribeVal = cat.name;
          this.defaultSort = cat.id;
          this.fetchArticles('GetArticlesByCategory', Category);
          // this.articleService.GetArticlesByCategory(Category).subscribe(data => {
          //   this.sortedArticles = data;
          // });
        } else if (SearchTerm !== undefined) {
          this.showSubscribeBtn = true;
          this.subscribeType = 'SearchTerm';
          this.subscribeVal = SearchTerm;
          this.defaultSort = 'All';

          this.articleService
            .GetArticlesSearchResults(SearchTerm)
            .subscribe(data => {
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
            this.sortedArticles = data;
          });
        }
      });
    });
  }

  setParams(_showSubscribeBtn, _subscribeType, _subscribeVal) {
    this.showSubscribeBtn = _showSubscribeBtn;
    this.subscribeType = _subscribeType;
    this.subscribeVal = _subscribeVal;
  }
  sortBy(sort) {
    this.defaultSort = sort;
    this.searchTerm = '';
    this.searchResLbl = '';
    this.resultsNumberFor = '';
    if (sort.toLowerCase() !== '0') {
      this.router.navigateByUrl('/pages/archive?Category=' + sort);
    } else {
      this.fetchArticles('GetArticles', '');
      this.router.navigateByUrl('/pages/archive');
    }
  }
}
