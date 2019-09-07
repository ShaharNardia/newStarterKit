import { Post } from './Post';

export class PostTag {

   
    PostId;
    PostTitle;
    tags = [];

    constructor(private Post: Post) { 
        this.PostId= this.Post.id;
        this.PostTitle=this.Post.title;
    }
    
}
