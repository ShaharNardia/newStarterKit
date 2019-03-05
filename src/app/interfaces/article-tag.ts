import { Article } from './article';

export class ArticleTag {

   
    articleId;
    articleTitle;
    tags = [];

    constructor(private article: Article) { 
        this.articleId= this.article.Id;
        this.articleTitle=this.article.Title;
    }
    
}
