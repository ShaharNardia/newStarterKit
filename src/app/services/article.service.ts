import { Injectable } from '@angular/core';
import { TouchSequence } from 'selenium-webdriver';
import { HttpClient } from '@angular/common/http';
import { Article } from '../interfaces/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  // articles = [{
  //   id: 1,
  //   category: 'Category1',
  //   title: 'first article',
  //   content: '',
  //   img: '',
  //   date: this.getDate('1968-11-16T00:00:00'),
  //   author: 'shahar nardia',
  //   views: 2,
  //   tags: ['this', 'is', 'first', 'the', 'about', 'page']
  // }];
  articles = [{}];
  constructor(private srv: HttpClient) {}

  // If you’re using non-pretty permalinks, you should pass the REST API route as a query string parameter. 
  // The route http://oursite.com/wp-json/ in the example above would hence be
  //           http://oursite.com/?rest_route=/.


  //wpurl = 'https://www.igeekphone.com/wp-json/wp/v2/';
  //wpurl = 'http://belivindesign.com/wp-json/wp/v2/';
    wpurl = 'https://pevly.com//wp-json/wp/v2/';
  

  GetArticles() {
    return this.srv.get<any>(`${this.wpurl}posts/`);
  }

  GetArticleById(id) {
    return this.srv.get(`${this.wpurl}posts/${id}`);
  }

  GetArticlesByCategory(category) {
    return this.srv.get(`${this.wpurl}posts/?categories=${category}`); //posts?categories=20,30
  }

  GetArticlesByAuthor(Author) {
    return this.srv.get(`${this.wpurl}posts/?author=${Author}`);
  }

  GetArticlesSearchResults(term) {
    return this.srv.get(`${this.wpurl}posts/?search=${term}`);
  }

  GetArticlesByTags(tag) {
    return this.srv.get(`${this.wpurl}posts/?tags=${tag}`);
  }

  GetArticleImg(mediaId) {
    return this.srv.get<any>(`${this.wpurl}media/${mediaId}`);
  }

  GetAllAuthors() {
    return this.srv.get(`${this.wpurl}users`);
  }

  GetAllCategories() {
    return this.srv.get(`${this.wpurl}categories`);
  }

  returnMostViewd(number, currentId) {
    let MostViewdArticles = Object.assign([], this.articles);
    return MostViewdArticles.filter(article => {
      return article.id != currentId;
    })
      .sort((a, b) => {
        return b.views - a.views;
      })
      .slice(0, number);
  }

  returnMostRecent(number, currentId) {
    let MostRecentArticles = Object.assign([], this.articles);
    return MostRecentArticles.filter(article => {
      return article.id != currentId;
    })
      .sort((a, b) => {
        return b.date - a.date;
      })
      .slice(0, number);
  }

  returnSameCategory(number, category, currentId) {
    let SameCategoryArticles = Object.assign([], this.articles);
    return SameCategoryArticles.filter(article => {
      return article.id != currentId;
    })
      .filter(article => {
        return article.category == category;
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
