import { Injectable, Component, Input, Output, EventEmitter, OnInit  } from '@angular/core';

@Component({
  selector: 'app-pdf-navigator',
  templateUrl: './pdf-navigator.component.html',
  styleUrls: ['./pdf-navigator.component.css']
})
export class PdfNavigatorComponent implements OnInit {

  @Input() pdfPage: number;
  @Input() loading: number;
  @Input() totalPdfPages: number;
  @Output() onPageChanged: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  nextPage($event) {
    if (this.pdfPage >= this.totalPdfPages) {
      return;
    }
    this.pdfPage ++;
    this.changePdfPage(null);
  }

  previousPage($event) {
    if (this.pdfPage <= 1) {
      return;
    }
    this.pdfPage --;
    this.changePdfPage(null);
  }

  lastPage($event) {
    if (this.pdfPage <= 0) {
      return;
    }
    this.pdfPage = this.totalPdfPages;
    this.changePdfPage(null);
  }

  firstPage($event) {
    this.pdfPage = 1;
    this.changePdfPage(null);
  }

  changePdfPage(event) {
    if (this.pdfPage === this.totalPdfPages) {
      this.pdfPage = this.totalPdfPages;
    }
    this.onPageChanged.emit(this.pdfPage);
  }



}
