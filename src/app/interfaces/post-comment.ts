import { Post } from './Post';
import { User } from './user';

export class PostComment {

    userId;
    userFullName;
    PostId;
    PostTitle;
    userComment;

    constructor(private Post: Post, private user: User) { 
        
        this.userId= this.user.Id;
        this.userFullName= this.user.firstName + ' - ' + this.user.lastName;
        this.PostId= this.Post.Id;
        this.PostTitle=this.Post.Title;
    }
    
    
}
