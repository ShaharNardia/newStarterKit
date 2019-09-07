import { PostView } from './Post-view';
import { PostTag } from './Post-tag';

export class Post {
    id: string;
    date: string;
    link: string;
    title:   {rendered: string};   // title.renderend
    content: {rendered: string}; // content.renderend
    excerpt: {rendered: string};  // excerpt.renderend
    author: string;  // numberId; to get on the flight
    featured_media: string;  // numberId; to get on the flight
    categories: string[];  // numberId[]; to get on the flight
    tags: [];
    
    
    // Img: string;
    // Date: Date;
    // Author: string;
    // AuthorId: string;
    // Views: number;
    // Tags;
}


    
   