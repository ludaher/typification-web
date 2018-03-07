import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css']
})
export class PagerComponent implements OnInit {

  @Input() page: number; // the current page
  @Input() count: number; // how many total items there are in all pages
  @Input() perPage: number; // how many items we want to show per page
  @Input() pagesToShow: number; // how many pages between next/prev
  @Input() loading: boolean; // check if content is being loaded

  @Output() goToPage = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  changePage() {
    this.goToPage.emit(this.page);
  }

  goTo(page) {
    this.goToPage.emit(page);
  }

  onPrev(): void {
    this.goToPage.emit(this.page - 1);
  }

  onNext(next: boolean): void {
    this.goToPage.emit(this.page + 1);
  }
}
