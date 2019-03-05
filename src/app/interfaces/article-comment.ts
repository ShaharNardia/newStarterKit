import { Article } from './article';
import { User } from './user';

export class ArticleComment {

    userId;
    userFullName;
    articleId;
    articleTitle;
    userComment;

    constructor(private article: Article, private user: User) { 
        
        this.userId= this.user.Id;
        this.userFullName= this.user.firstName + ' - ' + this.user.lastName;
        this.articleId= this.article.Id;
        this.articleTitle=this.article.Title;
    }
    
    
}
