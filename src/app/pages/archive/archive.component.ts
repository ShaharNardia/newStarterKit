import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/postsvc.service';
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
  Posts = [];
  sortedPosts: any = [];
  showSubscribeBtn: boolean;

  constructor(
    private PostService: PostService,
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
    // this.PostService.GetPosts(this.index).subscribe(data => {
    this.setParams(true, 'News Letter', '', '0', 0);
    //   this.checkIfhasData(data);
    //   //this.sortedPosts = data;
    // });

   
    this.route.queryParams.subscribe(params => {
      const Author = params['Author'];
      const Category = params['Category'];
      const SearchTerm = params['SearchTerm'];
      const Tag = params['Tag'];

      if (Author !== undefined) {
        // this.PostService.GetPostsByAuthor(Author).subscribe(data => {
        //   this.setParams(true, 'Author', Author, '0', data);
        // });
        if (Author === this.user.userNameAuth) {
          this.showSubscribeBtn = false;
        } else {
          this.showSubscribeBtn = true;
        }
      } else if (Category !== undefined) {



        // this.PostService.GetPostsByCategory(Category).subscribe(data => {
        //   this.setParams(true, 'Category', sessionStorage.getItem('categorySort'), Category, data);
        // });
      } else if (SearchTerm !== undefined) {

        // this.PostService
        //   .GetPostsSearchResults(SearchTerm)
        //   .subscribe(data => {
        //     this.setParams(true, 'SearchTerm', SearchTerm, '0', data);
        //   });
        this.resultsNumberFor = `we found ${
          this.sortedPosts.length
          } results for '${SearchTerm}'`;
        this.searchResLbl = `sorry, we could not find '${SearchTerm}' , please search other term...`;
        this.searchTerm = SearchTerm;
      } else if (SearchTerm === undefined) {
        this.resultsNumberFor = '';
      } else if (Tag !== undefined) {
        // this.PostService.GetPostsByTags(Tag).subscribe(data => {
        //   this.setParams(true, 'Tag', Tag, '0', data);
       // });
        this.resultsNumberFor = `here ${
          this.sortedPosts.length
          } Posts with tag '${Tag}'`;
        this.searchResLbl = ``;
        this.searchTerm = '';
      } else {
        // this.PostService.GetAllPosts(this.index).subscribe(data => {
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
    _sortedPosts: any
  ) {
    this.showSubscribeBtn = _showSubscribeBtn;
    this.subscribeType = _subscribeType;
    this.subscribeVal = _subscribeVal;
    if (_sortedPosts !== 0) {
      this.sortedPosts = _sortedPosts;
    }
    if (_defaultSort !== '') {
      this.defaultSort = _defaultSort;
    }
  }
}
