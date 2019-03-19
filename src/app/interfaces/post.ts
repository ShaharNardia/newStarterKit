import { PostView } from './Post-view';
import { PostTag } from './Post-tag';

export class Post {
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
    constructor(private tag: PostTag) {
        this.Tags = this.tag.tags;
    }
}