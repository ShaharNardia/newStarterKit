import { Component, OnInit } from "@angular/core";
import { PostService } from "src/app/services/postsvc.service";
import { CrudstoreService } from "src/app/services/crudstore.service";
import { AngularFireStorage } from "@angular/fire/storage";
import { Post } from "../../interfaces/post";

@Component({
  selector: "app-wizard",
  templateUrl: "./wizard.component.html",
  styleUrls: ["./wizard.component.css"],
})
export class WizardComponent implements OnInit {
  posts: Post[] = [];
  postsDone = false;
  showPostsList = false;

  pages: any[] = [];
  pagesDone = false;
  showPagesList = false;

  sites: any[] = [];
  sitesDone = false;
  showSitesList = false;

  categories: any[] = [];
  categoriesDone = false;
  showCategoriesList = false;

  users: any[] = [];
  usersDone = false;
  showUsersList = false;

  medias: any[] = [];
  mediaDone = false;
  showMediasList = false;

  tags: any[] = [];
  tagsDone = false;
  showTagsList = false;

  comments: any[] = [];
  commentsDone = false;
  showCommentsList = false;

  products: any[] = [];
  productsDone = false;
  showproductsList = false;

  restPath = "/wp-json/wp/v2/";
  restPath2 = "/?rest_route=/wp/v2/";
  website = "";
  index = 1;
  sign = "?";
  insertDis = false;
  doneAndCont = false;
  isRest = false;
  siteName = "";
  fullSiteUrl = "";

  constructor(
    private PostService: PostService,
    private crudst: CrudstoreService,
    private afs: AngularFireStorage
  ) {}

  ngOnInit() {}
  getSiteContent(siteUrl) {
    if (!siteUrl.startsWith("http")) {
      siteUrl = "https://" + siteUrl;
    } else if (siteUrl.startsWith("http://")) {
      siteUrl.replace("http://", "https://");
    }

    if (siteUrl[siteUrl.length - 1] === "/") {
      siteUrl = siteUrl.substring(0, siteUrl.length - 1);
    }

    console.log("Start Checking site - " + siteUrl);
    this.fullSiteUrl = siteUrl;
    this.checkWPapi(siteUrl);
  }

  checkWPapi(siteUrl) {
    this.siteName = siteUrl.replace("https://", "").split(".")[0];
    let tempUrl = siteUrl + this.restPath;
    this.PostService.CheckIfRest(tempUrl).subscribe(
      data => {
        if (data) {
          console.log(data);
          this.website = tempUrl;
          this.insertDis = true;
          this.isRest = true;

          this.getPosts(this.index); //starts the proccess of importing all data
        }
      },
      error => {
        if (error.status !== 200) {
          // console.log('This website is using non-pretty permalinks');
          // console.log('So we will try to use "/?rest_route=/wp/v2/" insted of "/wp-json/wp/v2/"....');
          this.secondCheck(siteUrl);
        }
      }
    );
  }

  secondCheck(siteUrl) {
    let tempUrl = siteUrl + this.restPath2;
    this.sign = "&";
    this.PostService.CheckIfRest(tempUrl).subscribe(
      data => {
        if (data) {
          // console.log(data);
          this.insertDis = true;
          this.isRest = true;
          this.website = tempUrl;
          this.getPosts(this.index); //starts the proccess of importing all data
        }
      },
      error => {
        if (error.status !== 200) {
          //  console.log('This website does not allow getting his data');
          this.sign = "?";
        }
      }
    );
  }

  checkIfhasData(data, type) {
    if (type === "post") {
      this.posts.push(...data);
      this.index++;
      this.getPosts(this.index);
    } else if (type === "page") {
      this.pages.push(...data);
      this.index++;
      this.getPages(this.index);
    } else if (type === "site") {
      this.sites.push(...data);
      this.index++;
      this.getSites(this.index);
    } else if (type === "category") {
      this.categories.push(...data);
      this.index++;
      this.getCategories(this.index);
    } else if (type === "user") {
      this.users.push(...data);
      this.index++;
      this.getUsers(this.index);
    } else if (type === "media") {
      this.medias.push(...data);
      this.index++;
      this.getMedia(this.index);
    } else if (type === "tag") {
      this.tags.push(...data);
      this.index++;
      this.getTags(this.index);
    } else if (type === "comment") {
      this.comments.push(...data);
      this.index++;
      this.getComments(this.index);
    } else if (type === "product") {
      this.products.push(...data);
      this.index++;
      this.getProducts(this.index);
    }
  }
  getPosts(pageNumber) {
    this.PostService.GetAllPosts(pageNumber, this.website, this.sign).subscribe(
      data => {
        if (data.length > 0) {
          console.log(data[1].id);
          console.log(data[1].author);
          console.log(data[1].categories);
          console.log(data[1].title.rendered);
          console.log(data[1].date);
          console.log(data[1].content.rendered);
          console.log(data[1].excerpt.rendered);
          console.log(data[1].tags);
          console.log(data[1].link);

          this.checkIfhasData(data, "post");
        } else {
          this.crudst.insertToDB(`${this.siteName}_posts`, this.posts);
          this.index = 1;
          this.postsDone = true;
          this.getPages(this.index);
        }
      },
      error => {
        // console.log(error);
        this.crudst.insertToDB(`${this.siteName}_posts`, this.posts);
        this.index = 1;
        this.postsDone = true;
        //   console.log('posts - ');
        //   console.log(this.posts);
        this.getPages(this.index);
      }
    );
  }

  getPages(pageNumber) {
    this.PostService.GetAllPages(pageNumber, this.website, this.sign).subscribe(
      data => {
        if (data.length > 0) {
          this.checkIfhasData(data, "page");
        } else {
          this.crudst.insertToDB(`${this.siteName}_pages`, this.pages);
          this.index = 1;
          this.pagesDone = true;
          this.getSites(this.index);
        }
      },
      error => {
        // console.log(error);
        this.crudst.insertToDB(`${this.siteName}_pages`, this.pages);
        this.index = 1;
        this.pagesDone = true;
        // console.log('pages - ');
        // console.log(this.posts);
        this.getSites(this.index);
      }
    );
  }

  getSites(pageNumber) {
    this.PostService.GetAllSites(pageNumber, this.website, this.sign).subscribe(
      data => {
        if (data.length > 0) {
          this.checkIfhasData(data, "site");
        } else {
          this.crudst.insertToDB(`${this.siteName}_sites`, this.sites);
          this.index = 1;
          this.sitesDone = true;
          this.getCategories(this.index);
        }
      },
      error => {
        // console.log(error);
        this.crudst.insertToDB(`${this.siteName}_sites`, this.sites);
        this.index = 1;
        this.sitesDone = true;
        // console.log('pages - ');
        // console.log(this.posts);
        this.getCategories(this.index);
      }
    );
  }

  getCategories(pageNumber) {
    this.PostService.GetAllCategories(
      pageNumber,
      this.website,
      this.sign
    ).subscribe(
      data => {
        if (data.length > 0) {
          this.checkIfhasData(data, "category");
        } else {
          this.crudst.insertToDB(
            `${this.siteName}_categories`,
            this.categories
          );
          this.index = 1;
          this.categoriesDone = true;
          this.getUsers(this.index);
        }
      },
      error => {
        //  console.log(error);
        this.crudst.insertToDB(`${this.siteName}_categories`, this.categories);
        this.index = 1;
        this.categoriesDone = true;
        // console.log('categories - ');
        // console.log(this.categories);
        this.getUsers(this.index);
      }
    );
  }

  getUsers(pageNumber) {
    this.PostService.GetAllUsers(pageNumber, this.website, this.sign).subscribe(
      data => {
        if (data.length > 0) {
          this.checkIfhasData(data, "user");
        } else {
          this.crudst.insertToDB(`${this.siteName}_users`, this.users);
          this.index = 1;
          this.usersDone = true;
          this.getMedia(this.index);
        }
      },
      error => {
        //  console.log(error);
        this.crudst.insertToDB(`${this.siteName}_users`, this.users);
        this.index = 1;
        this.usersDone = true;
        this.getMedia(this.index);
      }
    );
  }

  getMedia(pageNumber) {
    this.PostService.GetAllMedia(pageNumber, this.website, this.sign).subscribe(
      data => {
        if (data.length > 0) {
          data.forEach(media => {
            const ref = this.afs.storage.ref();
            const file = media.source_url; //  document.querySelector("#photo").files[0]; //use url here
            const name = media.media_details.sizes.full.file;
            const metadata = {
              contentType: file.type,
            };
            const mediaUrl =
              this.siteName + "/" + file.replace(this.fullSiteUrl, "");
            const task = ref
              .child(mediaUrl.replace("//", "/"))
              .put(file, metadata);
            task
              .then(snapshot => snapshot.ref.getDownloadURL())
              .then(url => {
                console.log(url);
                // document.querySelector("#someImageTagID").src = url;
              })
              .catch(console.error);
          });
          this.checkIfhasData(data, "media");
        } else {
          this.crudst.insertToDB(`${this.siteName}_medias`, this.medias);
          this.index = 1;
          this.mediaDone = true;
          this.getTags(this.index);
        }
      },
      error => {
        //   console.log(error);
        this.crudst.insertToDB(`${this.siteName}_medias`, this.medias);
        this.index = 1;
        this.mediaDone = true;
        this.getTags(this.index);
      }
    );
  }

  getTags(pageNumber) {
    //console.log(pageNumber);
    this.PostService.GetAllTags(pageNumber, this.website, this.sign).subscribe(
      data => {
        if (data.length > 0) {
          this.checkIfhasData(data, "tag");
        } else {
          this.crudst.insertToDB(`${this.siteName}_tags`, this.tags);
          this.index = 1;
          this.tagsDone = true;
          this.getComments(this.index);
        }
      },
      error => {
        //  console.log(error);
        this.crudst.insertToDB(`${this.siteName}_tags`, this.tags);
        this.index = 1;
        this.tagsDone = true;
        this.getComments(this.index);
      }
    );
  }

  getComments(pageNumber) {
    this.PostService.GetAllComments(
      pageNumber,
      this.website,
      this.sign
    ).subscribe(
      data => {
        if (data.length > 0) {
          this.checkIfhasData(data, "comment");
        } else {
          this.crudst.insertToDB(`${this.siteName}_comments`, this.comments);
          this.commentsDone = true;
          this.insertDis = true;
          //  console.log('go to products');
          this.getProducts(this.index);
        }
      },
      error => {
        //  console.log(error);
        this.crudst.insertToDB(`${this.siteName}_comments`, this.comments);
        this.commentsDone = true;
        this.insertDis = true;
        // console.log('go to products');
        this.getProducts(this.index);
      }
    );
  }

  getProducts(pageNumber) {
    this.PostService.GetAllProducts(
      pageNumber,
      this.website,
      this.sign
    ).subscribe(
      data => {
        if (data.length > 0) {
          this.checkIfhasData(data, "product");
        } else {
          this.crudst.insertToDB(`${this.siteName}_products`, this.products);
          this.productsDone = true;
          this.insertDis = true;
          this.doneAndCont = true;
        }
      },
      error => {
        // console.log(error);
        this.crudst.insertToDB(`${this.siteName}_products`, this.products);
        this.productsDone = true;
        this.doneAndCont = true;
      }
    );
  }

  resetData() {
    //this.posts = [];
    this.postsDone = false;
    //this.pages = [];
    this.pagesDone = false;

    this.sitesDone = false;
    //this.products = [];
    this.productsDone = false;
    //  this.categories = [];
    this.categoriesDone = false;
    //  this.users= [];
    this.usersDone = false;
    //  this.media= [];
    this.mediaDone = false;
    //  this.tags = [];
    this.tagsDone = false;
    //  this.comments = [];
    this.commentsDone = false;
    this.doneAndCont = false;
    this.insertDis = false;
    this.index = 1;
    this.sign = "?";
  }
}
