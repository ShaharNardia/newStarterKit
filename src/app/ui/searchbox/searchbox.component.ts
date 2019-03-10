import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.css']
})
export class SearchboxComponent implements OnInit {
  _searchTerm: any;

  constructor(private router: Router) {}

  ngOnInit() {
    this._searchTerm = sessionStorage.getItem('searchTerm');
  }

  search(_searchTerm: string) {
    sessionStorage.setItem('searchTerm', _searchTerm);
    sessionStorage.setItem('categoryIdSort', '0');
    if (_searchTerm !== undefined && _searchTerm.trim().length > 0) {
      this.router.navigateByUrl('/pages/archive?SearchTerm=' + _searchTerm);
    } else {
      this.router.navigateByUrl('/pages/archive');
    }
  }
}
