import { Injectable } from '@angular/core';
import { TouchSequence } from 'selenium-webdriver';
import { HttpClient } from '@angular/common/http';
import { Post } from '../interfaces/Post';



@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  Posts = [{}];
  constructor(private srv: HttpClient) { }

  // If you’re using non-pretty permalinks, you should pass the REST API route as a query string parameter.
  // The route http://oursite.com/wp-json/ in the example above would hence be
  //           http://oursite.com/?rest_route=/.

  //wpurl = 'https://www.igeekphone.com/wp-json/wp/v2/';
  //wpurl = 'http://belivindesign.com/wp-json/wp/v2/';
  //wpurl = 'https://pevly.com//wp-json/wp/v2/';

  GetAllPosts(index, wpurl, sign) {
    return this.srv.get<Post[]>(`${wpurl}posts/${sign}page=${index}`);
  }

  GetAllProducts(index, wpurl, sign) {
    return this.srv.get<any>(`${wpurl}product/${sign}page=${index}`);
  }


  GetPostById(id, wpurl) {
    return this.srv.get<any[]>(`${wpurl}posts/${id}`);
  }

  GetPostsByCategory(category: string, wpurl, sign) {
    return this.srv.get<any[]>(`${wpurl}posts/${sign}categories=${category}`); //posts?categories=20,30
  }

  GetPostsByAuthor(Author: string, wpurl, sign) {
    return this.srv.get<any[]>(`${wpurl}posts/${sign}author=${Author}`);
  }

  GetPostsSearchResults(term: string, wpurl, sign) {
    return this.srv.get<any[]>(`${wpurl}posts/${sign}search=${term}`);
  }

  GetPostsByTags(tag: string, wpurl, sign) {
    return this.srv.get<any[]>(`${wpurl}posts/${sign}tags=${tag}`);
  }

  GetPostImg(mediaId, wpurl) {
    return this.srv.get<any>(`${wpurl}media/${mediaId}`);
  }

  GetCategoryNameById(catId, wpurl) {
    return this.srv.get<any>(`${wpurl}categories/${catId}`);
  }

  GetAllUsers(index, wpurl, sign) {
    return this.srv.get<any[]>(`${wpurl}users/${sign}page=${index}`);
  }

  GetAllTags(index, wpurl, sign) {
    return this.srv.get<any[]>(`${wpurl}tags/${sign}page=${index}`);
  }

  GetAllCategories(index, wpurl, sign) {
    return this.srv.get<any[]>(`${wpurl}categories/${sign}page=${index}`);
  }

  GetAllComments(index, wpurl, sign) {
    return this.srv.get<any[]>(`${wpurl}comments/${sign}page=${index}`);
  }

  GetAllMedia(index, wpurl, sign) {
    return this.srv.get<any[]>(`${wpurl}media/${sign}page=${index}`);
  }

  GetAllPages(index, wpurl, sign) {
    return this.srv.get<any[]>(`${wpurl}pages/${sign}page=${index}`);
  }


  CheckIfRest(wpurl) {
    return this.srv.get<any[]>(wpurl);
  }
  returnMostViewd(number, currentId) {
    let MostViewdPosts = Object.assign([], this.Posts);
    return MostViewdPosts.filter(Post => {
      return Post.id != currentId;
    })
      .sort((a, b) => {
        return b.views - a.views;
      })
      .slice(0, number);
  }

  returnMostRecent(number, currentId) {
    let MostRecentPosts = Object.assign([], this.Posts);
    return MostRecentPosts.filter(Post => {
      return Post.id != currentId;
    })
      .sort((a, b) => {
        return b.date - a.date;
      })
      .slice(0, number);
  }

  returnSameCategory(number, category, currentId) {
    let SameCategoryPosts = Object.assign([], this.Posts);
    return SameCategoryPosts.filter(Post => {
      return Post.id != currentId;
    })
      .filter(Post => {
        return Post.category == category;
      })
      .slice(0, number);
  }

  unique(value, index, self) {
    return self.indexOf(value) === index;
  }

  getDate(date) {
    let dateString = date;
    let newDate = new Date(dateString);
    return newDate;
  }
}
