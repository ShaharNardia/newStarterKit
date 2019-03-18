import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css']
})
export class WizardComponent implements OnInit {


  posts: any[] = [];
  postsDone = false;

  categories: any[] = [];
  categoriesDone = false;

  users: any[] = [];
  usersDone = false;

  media: any[] = [];
  mediaDone = false;

  tags: any[] = [];
  tagsDone = false;

  comments: any[] = [];
  commentsDone = false;

  website = '';
  index = 1;

  constructor(private articleService: ArticleService) { }

  ngOnInit() {
  }
  getSiteContent(siteUrl) {
    this.website = siteUrl + '/wp-json/wp/v2/';
    this.getPosts(this.index);
    //console.log(siteUrl);
  }
  checkIfhasData(data, type) {
    if (data.length > 0) {
      if (type === 'post') {
        this.posts.push(...data);
        if (data.length == 10) {
          this.getPosts(this.index++)
        }
        else {
          this.index = 1;
          this.postsDone = true;
          console.log(this.posts);
          this.getCategories(this.index);
        }
      }
      else if (type === 'category') {
        this.categories.push(...data);
        if (data.length == 10) {
          this.getCategories(this.index++)
        }
        else {
          this.index = 1;
          this.categoriesDone = true;
          console.log(this.categories);
          this.getUsers(this.index);
        }
      }
      else if (type === 'user') {
        this.users.push(...data);
        if (data.length == 10) {
          this.getUsers(this.index++)
        }
        else {
          this.index = 1;
          this.usersDone = true;
          console.log(this.users);
          this.getMedia(this.index);
        }
      }

      else if (type === 'media') {
        this.media.push(...data);
        if (data.length == 10) {
          this.getMedia(this.index++)
        }
        else {
          this.index = 1;
          this.mediaDone = true;
          console.log(this.media);
          this.getTags(this.index);
        }
      }
      else if (type === 'tag') {
        this.tags.push(...data);
        if (data.length == 10) {
          this.getTags(this.index++)
        }
        else {
          this.index = 1;
          this.tagsDone = true;
          console.log(this.tags);
          this.getComments(this.index);
        }
      }
      else if (type === 'comment') {
        this.comments.push(...data);
        if (data.length == 10) {
          this.getComments(this.index++)
        }
        else {
          this.index = 0;
          this.commentsDone = true;
          console.log(this.comments);
        }
      }

    }
  }

  getPosts(pageNumber) {
    this.articleService.GetAllArticles(pageNumber, this.website).subscribe(data => {
      this.checkIfhasData(data, 'post');
    });
  }

  getCategories(pageNumber) {
    this.articleService.GetAllCategories(pageNumber, this.website).subscribe(data => {
      this.checkIfhasData(data, 'category');
    });
  }

  getUsers(pageNumber) {
    this.articleService.GetAllUsers(pageNumber, this.website).subscribe(data => {
      this.checkIfhasData(data, 'user');
    });
  }

  getMedia(pageNumber) {
    this.articleService.GetAllMedia(pageNumber, this.website).subscribe(data => {
      this.checkIfhasData(data, 'media');
    });
  }

  getTags(pageNumber) {
    this.articleService.GetAllTags(pageNumber, this.website).subscribe(data => {
      this.checkIfhasData(data, 'tag');
    });
  }

  getComments(pageNumber) {
    this.articleService.GetAllComments(pageNumber, this.website).subscribe(data => {
      this.checkIfhasData(data, 'comment');
    });
  }
}
