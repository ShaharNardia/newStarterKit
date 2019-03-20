import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService} from 'src/app/services/postsvc.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html'
})
export class PostComponent implements OnInit {

  subscribeType;
  subscribeVal;

  isNewPost = false;
  Post;
  date = new Date;
  views = 0;
  author: string = '';
  title: string = '';
  content: string = '';
  category: string = '';
  artId: string = '';
  img: string = '';
  tags = [];
  userMode = true;
  adminMode = false;
  constructor(private router: ActivatedRoute, private PostService: PostService, private route: Router) {

  }

  getCurrentPost() {
    this.isNewPost = false;
    this.artId = this.router.snapshot.params.id;
    // this.PostService.GetPostById(this.artId).subscribe(data=>{
    //   this.Post = data;
    // });
    this.title = this.Post[0].title;
    this.views = this.Post[0].views;
    this.author = this.Post[0].author;
    this.date = this.Post[0].date;
    this.content = this.Post[0].content;
    this.category = this.Post[0].category;

    this.img = this.Post[0].img;
    this.tags = this.Post[0].tags;


    this.subscribeType = 'Post';
    this.subscribeVal = this.artId;
  }

  ngDoCheck() {
    if (this.isNewPost != true) { this.getCurrentPost(); }
  }
  ngOnInit() {
    this.router.queryParams.subscribe(params => {
      let newPost = params['newPost'];
      if (newPost == 'true') {
        this.isNewPost = true;
        this.userMode = false;
        this.adminMode = true;
      }
      else {
        
        this.getCurrentPost();
      }
    })
  }

  redirectToTagResultes(tag) {
    this.route.navigateByUrl(`pages/archive?Tag=${tag}`);
  }
  checkMode(mode) {
    if (mode !== 'Admin Mode') {
      this.userMode = true;
      this.adminMode = false;
    }
    else {
      {
        this.userMode = false;
        this.adminMode = true;
      }
    }
  }


}
