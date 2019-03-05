import { ArticleView } from './article-view';
import { ArticleTag } from './article-tag';

export class Article {
    Id: string;
    Title: string;
    Category: string;
    Content: string;
    Img: string;
    Date: Date;
    Author: string;
    AuthorId: string;
    Views: number;
    Tags;
    constructor(private tag: ArticleTag) {
        this.Tags = this.tag.tags;
    }
}