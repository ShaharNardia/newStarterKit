import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/postsvc.service';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css']
})
export class WizardComponent implements OnInit {

  posts: any[] = [];
  postsDone = false;
  showPostsList = false;

  pages: any[] = [];
  pagesDone = false;
  showPagesList = false;

  categories: any[] = [];
  categoriesDone = false;
  showCategoriesList = false;

  users: any[] = [];
  usersDone = false;
  showUsersList = false;

  medias: any[] = [];
  mediaDone = false;
  showMediasList = false;

  tags: any[] = [];
  tagsDone = false;
  showTagsList = false;

  comments: any[] = [];
  commentsDone = false;
  showCommentsList = false;

  products: any[] = [];
  productsDone = false;
  showproductsList = false;

  restPath = '/wp-json/wp/v2/';
  restPath2 = '/?rest_route=/wp/v2/';
  website = '';
  index = 1;
  sign = '?';
  insertDis = false;
  doneAndCont = false
  isRest = false;

  constructor(private PostService: PostService) { }

  ngOnInit() {
  }
  getSiteContent(siteUrl) {
    if (!siteUrl.startsWith('http')) {
      siteUrl = 'https://' + siteUrl;
    }
    else if (siteUrl.startsWith('http://')) {
      siteUrl.replace('http://', 'https://')
    }

    if (siteUrl[siteUrl.length - 1] === '/') {
      siteUrl = siteUrl.substring(0, siteUrl.length - 1);
    }

    console.log('Start Checking site - ' + siteUrl);
    this.checkWPapi(siteUrl);
  }

  checkWPapi(siteUrl) {
    let tempUrl = siteUrl + this.restPath;
    this.PostService.CheckIfRest(tempUrl)
      .subscribe(
        data => {
          if (data) {
            console.log(data);
            this.website = tempUrl;
            this.insertDis = true;
            this.isRest = true;
            this.getPosts(this.index); //starts the proccess of importing all data
          }
        },
        error => {
          if (error.status !== 200) {
            console.log('This website is using non-pretty permalinks');
            console.log('So we will try to use "/?rest_route=/wp/v2/" insted of "/wp-json/wp/v2/"....');
            this.secondCheck(siteUrl);
          }
        }
      )
  }

  secondCheck(siteUrl) {
    let tempUrl = siteUrl + this.restPath2;
    this.sign = '&';
    this.PostService.CheckIfRest(tempUrl)
      .subscribe(
        data => {
          if (data) {
            console.log(data);
            this.insertDis = true;
            this.isRest = true;
            this.website = tempUrl;
            this.getPosts(this.index); //starts the proccess of importing all data
          }
        },
        error => {
          if (error.status !== 200) {
            console.log('This website does not allow getting his data');
            this.sign = '?';
            //this.secondCheck();
          }
        }
      )

  }

  checkIfhasData(data, type) {

    if (type === 'post') {
      this.posts.push(...data);
      this.index++;
      this.getPosts(this.index);
    }
    else if (type === 'page') {
      this.pages.push(...data);
      this.index++;
      this.getPages(this.index);
    }
    else if (type === 'category') {
      this.categories.push(...data);
      this.index++;
      this.getCategories(this.index);
    }
    else if (type === 'user') {
      this.users.push(...data);
      this.index++;
      this.getUsers(this.index);
    }
    else if (type === 'media') {
      this.medias.push(...data);
      this.index++;
      this.getMedia(this.index);
    }
    else if (type === 'tag') {
      this.tags.push(...data);
      this.index++;
      this.getTags(this.index);
    }
    else if (type === 'comment') {
      this.comments.push(...data);
      this.index++;
      this.getComments(this.index);
    }
    else if (type === 'product') {
      this.products.push(...data);
      this.index++;
      this.getProducts(this.index);
    }
  }
  getPosts(pageNumber) {
    this.PostService.GetAllPosts(pageNumber, this.website, this.sign).subscribe(
      data => {


        if (data.length > 0) {
          this.checkIfhasData(data, 'post');
        }
        else {
          this.index = 1;
          this.postsDone = true;
          this.getPages(this.index);
        }


      },
      error => {
        console.log(error);
        this.index = 1;
        this.postsDone = true;
        console.log('posts - ');
        console.log(this.posts);
        this.getPages(this.index);
      }
    );
  }

  getPages(pageNumber) {
    this.PostService.GetAllPages(pageNumber, this.website, this.sign).subscribe(
      data => {


        if (data.length > 0) {
          this.checkIfhasData(data, 'page');
        }
        else {
          this.index = 1;
          this.pagesDone = true;
          this.getCategories(this.index);
        }


      },
      error => {
        console.log(error);
        this.index = 1;
        this.pagesDone = true;
        console.log('pages - ');
        console.log(this.posts);
        this.getCategories(this.index);
      }
    );
  }

  getCategories(pageNumber) {
    console.log('I am in getCategories() - ' + pageNumber);
    this.PostService.GetAllCategories(pageNumber, this.website, this.sign).subscribe(
      data => {
        if (data.length > 0) {
          this.checkIfhasData(data, 'category');
        }
        else {
          this.index = 1;
          this.categoriesDone = true;
          this.getUsers(this.index);
        }
      },
      error => {
        console.log(error);
        this.index = 1;
        this.categoriesDone = true;
        console.log('categories - ');
        console.log(this.categories);
        this.getUsers(this.index);
      });
  }

  getUsers(pageNumber) {
    this.PostService.GetAllUsers(pageNumber, this.website, this.sign).subscribe(
      data => {
        if (data.length > 0) {
          this.checkIfhasData(data, 'user');
        }
        else {
          this.index = 1;
          this.usersDone = true;
          this.getMedia(this.index);
        }
      },
      error => {
        console.log(error);
        this.index = 1;
        this.usersDone = true;
        this.getMedia(this.index);
      });
  }

  getMedia(pageNumber) {
    this.PostService.GetAllMedia(pageNumber, this.website, this.sign).subscribe(data => {
      if (data.length > 0) {
        this.checkIfhasData(data, 'media');
      }
      else {
        this.index = 1;
        this.mediaDone = true;
        this.getTags(this.index);
      }
    },
      error => {
        console.log(error);
        this.index = 1;
        this.mediaDone = true;
        this.getTags(this.index);
      });
  }

  getTags(pageNumber) {
    console.log(pageNumber);
    this.PostService.GetAllTags(pageNumber, this.website, this.sign).subscribe(data => {
      if (data.length > 0) {
        this.checkIfhasData(data, 'tag');
      }
      else {
        this.index = 1;
        this.tagsDone = true;
        this.getComments(this.index);
      }
    },
      error => {
        console.log(error);
        this.index = 1;
        this.tagsDone = true;
        this.getComments(this.index);
      });
  }

  getComments(pageNumber) {
    this.PostService.GetAllComments(pageNumber, this.website, this.sign).subscribe(data => {
      if (data.length > 0) {
        this.checkIfhasData(data, 'comment');
      }
      else {
        this.commentsDone = true;
        this.insertDis = true;
        this.getProducts(this.index);
      }
    },
      error => {
        console.log(error);
        this.commentsDone = true;
        this.insertDis = true;
        this.getProducts(this.index);
      });
  }


  getProducts(pageNumber) {
    this.PostService.GetAllProducts(pageNumber, this.website, this.sign).subscribe(data => {
      if (data.length > 0) {
        this.checkIfhasData(data, 'product');
      }
      else {
        this.productsDone = true;
        this.insertDis = true;
        this.doneAndCont = true;
      }
    },
      error => {
        console.log(error);
        this.productsDone = true;
        //this.getComments(this.index);
      });
  }



  resetData() {
    //this.posts = [];
    this.postsDone = false;
    //  this.categories = [];
    this.categoriesDone = false;
    //  this.users= [];
    this.usersDone = false;
    //  this.media= [];
    this.mediaDone = false;
    //  this.tags = [];
    this.tagsDone = false;
    //  this.comments = [];
    this.commentsDone = false;
    this.doneAndCont = false;
    this.insertDis = false;
    this.index = 1;
    this.sign = '?';
  }

}
