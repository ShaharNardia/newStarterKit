import { Post } from './Post';

export class PostTag {

   
    PostId;
    PostTitle;
    tags = [];

    constructor(private Post: Post) { 
        this.PostId= this.Post.Id;
        this.PostTitle=this.Post.Title;
    }
    
}
