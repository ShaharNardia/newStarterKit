import { Component, OnInit, Input } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  @Input()
  dsort = '0';
  categories: any;
  constructor(
    private srv: ArticleService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  sortIt(catId: string, catName) {
    this.dsort = catId;
    sessionStorage.setItem('categorySort', catName);
    sessionStorage.setItem('categoryIdSort', catId);
    sessionStorage.setItem('searchTerm', '');
    console.log(this.dsort);
    if (this.dsort !== '0') {
      this.router.navigateByUrl('/pages/archive?Category=' + catId);
    } else {
      this.router.navigateByUrl('/pages/archive');
    }
  }
  ngOnInit() {
    this.srv.GetAllCategories().subscribe(catdata => {
      this.categories = catdata;
      const obj = this.categories[0];
      this.categories[0] = { id: '0', name: 'All' };
      this.categories.push({ id: obj.id.toString(), name: obj.name });

      this.route.queryParams.subscribe(params => {
        const Category = params['Category'];
        if (Category !== undefined && Category !== '0') {
          this.dsort = Category.toString();
        } else {
          this.dsort = '0';
        }
      });
    });
  }
}
