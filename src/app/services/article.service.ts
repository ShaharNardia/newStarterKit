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
  articles = [{
    id: 109187,
    date: "2017-11-13T09:49:12",
    slug: "%d7%90%d7%96-%d7%9e%d7%99-%d7%91%d7%90%d7%9e%d7%aa-%d7%a7%d7%a0%d7%94-%d7%97%d7%9b%d7%9d-%d7%91%d7%99%d7%95%d7%9d-%d7%94%d7%a8%d7%95%d7%95%d7%a7%d7%99%d7%9d-%d7%94%d7%a1%d7%99%d7%a0%d7%99",
    status: "publish",
    type: "post",
    link: "https://add2cart.co.il/%d7%90%d7%96-%d7%9e%d7%99-%d7%91%d7%90%d7%9e%d7%aa-%d7%a7%d7%a0%d7%94-%d7%97%d7%9b%d7%9d-%d7%91%d7%99%d7%95%d7%9d-%d7%94%d7%a8%d7%95%d7%95%d7%a7%d7%99%d7%9d-%d7%94%d7%a1%d7%99%d7%a0%d7%99/",
    title: {
      rendered: "אז מי באמת קנה חכם ביום הרווקים הסיני&#8230;"
    },
    content: {
      rendered: ""
    },
    excerpt: {
      rendered: "<p>אז הפעם החלטנו לבדוק יומיים אחרי הרעש הגדול של יום הרווקים הסיני מהם הבדלי המחיר בזמן המבצע ואחרי. יש תחושה רווחת שהמרוויחים הגדולים  שלא לומר הבלעדיים מהמבצע הזה הם עליבאבא, כבר מכירים את הטריק של &#8211; להעלות מחירים שבועיים לפני ואז לתת הנחה גדולה ביום המבצע&#8230; קשה לי להודות אבל האמת היה שמבין חמשת המוצרים &#8230;</p>\n",
    },
    author: 1010534,
    featured_media: 109188,
    categories: [7],
    tags: [21397, 1223, 21394, 21398, 21396, 21395, 13513]
  }];
  constructor(private srv: HttpClient) { }
  wpurl = 'https://ali-buy.com/wp-json/wp/v2/';

  GetArticles() {
    return this.srv.get<any>(`${this.wpurl}posts/`);
  }

  GetArticleById(id) {
    return this.srv.get(`${this.wpurl}posts/${id}`);
  }

  GetArticlesByCategory(category) {
    return this.srv.get(`${this.wpurl}posts/?categories=${category}`);//posts?categories=20,30
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

  GetArticleImg(mediaId){
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
    return MostViewdArticles.filter((article) => { return article.id != currentId }).sort((a, b) => { return b.views - a.views }).slice(0, number);
  }

  returnMostRecent(number, currentId) {
    let MostRecentArticles = Object.assign([], this.articles);
    return MostRecentArticles.filter((article) => { return article.id != currentId }).sort((a, b) => { return b.date - a.date; }).slice(0, number);
  }

  returnSameCategory(number, category, currentId) {
    let SameCategoryArticles = Object.assign([], this.articles);
    return SameCategoryArticles.filter(article => { return article.id != currentId }).filter(article => { return article.category == category }).slice(0, number);
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
