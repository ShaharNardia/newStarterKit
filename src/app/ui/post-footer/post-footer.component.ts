import { Component, OnInit, Input } from '@angular/core';
import { PostService } from 'src/app/services/postsvc.service';

@Component({
  selector: 'app-post-footer',
  templateUrl: './post-footer.component.html'
})
export class PostsFooterComponent implements OnInit {

  @Input() category;
  @Input() currentPostId;

  mostViewd = [];
  mostRecent = [];
  sameCategory = [];
  defaultSort;
  sorts = []
  sortedPosts;

  constructor(private PostService: PostService) {

  }

  setFooter() {
    if (this.defaultSort == 'Most Recent') {
      this.sortedPosts = this.PostService.returnMostRecent(3, this.currentPostId);
    } else if (this.defaultSort == 'Same Category') {
      this.sortedPosts = this.PostService.returnSameCategory(3, this.category, this.currentPostId);
    } else if (this.defaultSort == 'Most Viewd') {
      this.sortedPosts = this.PostService.returnMostViewd(3, this.currentPostId);
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


    //this.sortedPosts = this.mostRecent;
    this.setFooter();
  }

}
