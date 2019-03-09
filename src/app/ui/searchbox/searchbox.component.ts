import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.css']
})
export class SearchboxComponent implements OnInit, OnChanges {
  @Input() searchTermParam;
  searchTerm = '';
  searchTermlength = 0;
  constructor(private router: Router) {}

  ngOnInit() {
    this.searchTerm = this.searchTermParam;
  }

  ngOnChanges() {
    this.searchTerm = this.searchTermParam;
  }

  search(_searchTerm) {
    _searchTerm = this.searchTerm;
    if (
      _searchTerm !== undefined &&
      _searchTerm.length > 0 &&
      _searchTerm.trim().length > 0
    ) {
      // if () {
      this.router.navigateByUrl('/pages/archive?SearchTerm=' + _searchTerm);
      //}
    } else {
      this.router.navigateByUrl('/pages/archive');
    }
  }
}
