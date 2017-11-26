import { Component, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ValidationService } from '../../../services/typification/validation.service';
import { environment } from '../../../../environments/environment';

import { EventEmitter } from 'selenium-webdriver';
import { TypificationProcess } from '../../../model/typification/typification-process.model';
import { UserTypification } from '../../../model/typification/typification.model';

@Component({
  selector: 'app-validate',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.css']
})
export class ValidateComponent implements OnInit {
  sub: any;
  page: number;
  pdfPage: number;
  totalPdfPages: number;
  processId;
  productId;
  currentProcess: TypificationProcess;
  pdfSrc = '';
  error: string;
  pdfZoom: number;
  pdfLoaded: boolean;
  pdfSize: number;
  pdfSizeLoaded: number;
  loadAllPdf: boolean;

  @ViewChild('pdfPanel', { read: ElementRef }) private pdfPanel: ElementRef;

  constructor(private activatedRoute: ActivatedRoute,
    private validationService: ValidationService) { }

  ngOnInit() {
    // this.loadHotkeys();
    this.loadParameters();
    this.pdfZoom = 0.5;
    this.pdfLoaded = false;
    this.loadAllPdf = localStorage.getItem('loadAllPdf') === 'true';
  }

  loadParameters(): void {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.productId = +params['productId']; // (+) converts string 'id' to a number
      this.activatedRoute
        .queryParams
        .subscribe(queryParams => {
          // Defaults to 0 if no query param provided.
          this.processId = queryParams['processId'] || 0;
          this.loadProduct();
        });
      // In a real app: dispatch action to load the details here.
    });
  }

  loadProduct() {
    this.validationService.getTypificationProcess(this.processId)
      .subscribe(
      typificationProcess => {
        if (typificationProcess == null) { return; }
        this.loadProcessPdf();
        this.loadPdfPage();
        this.currentProcess = typificationProcess;
        this.productId = typificationProcess.process.productId;
        this.totalPdfPages = typificationProcess.process.totalPages;
      },
      error => this.error = 'Ha ocurrido un error con la aplicación'
      );
  }

  showError(): boolean {
    if (this.error) { return true; }
    return false;
  }

  onTypificationSaved(value) {
    this.onPageChanged(value.page);
  }

  onPageChanged(page) {
    if (this.loadAllPdf === true) {
      this.pdfPage = this.page = page;
    } else {
      this.page = page;
    }
    this.loadPdfPage();
  }

  loadProcessPdf() {
    if (this.loadAllPdf === false) {
      this.pdfSrc = `${environment.origin}/api/repository/${this.processId}`;
    }
  }

  loadPdfPage() {
    if (this.loadAllPdf === false) {
      this.pdfLoaded = false;
      if (this.page) {
        this.pdfSrc = `${environment.origin}/api/repository/${this.processId}/${this.page}`;
      } else {
        this.pdfSrc = `${environment.origin}/api/repository/${this.processId}/1`;
      }
    }
  }

  onLoadPdfComplete(e) {
    console.log('loadComplete');
    this.pdfLoaded = true;
    if (this.loadAllPdf === true || !this.page) {
      this.pdfPage = this.page = 1;
    }
  }

  onProgressPdf(e) {
    this.pdfSize = e.total;
    this.pdfSizeLoaded = e.loaded;
  }

  loadAllPdfChange(event) {
    localStorage.setItem('loadAllPdf', event);
    if (event === true) {
      this.pdfPage = this.page;
      this.pdfLoaded = true;
      this.loadProcessPdf();
    } else {
      this.loadPdfPage();
    }
  }

  typeKeydown(e) {
    if (e.key === 'Escape') {
      if (this.page > 1) { this.onPageChanged(this.page - 1); }
    }
    if (!e.altKey || !e.shiftKey) {
      return;
    } else if (e.key.toLowerCase() === 'z') {
      this.pdfZoom = 1;
    } else if (e.key.toLowerCase() === 'a') {
      this.pdfZoom = 0.5;
    } else if (e.key.toLowerCase() === '+' && this.pdfZoom < 2) {
      this.pdfZoom += 0.1;
    } else if (e.key.toLowerCase() === '-' && this.pdfZoom > 0.2) {
      this.pdfZoom -= 0.1;
    } else if (e.key.toLowerCase() === 'arrowup') {
      this.pdfPanel.nativeElement.scrollTop -= 100;
    } else if (e.key.toLowerCase() === 'arrowdown') {
      this.pdfPanel.nativeElement.scrollTop += 100;
    } else if (e.key.toLowerCase() === 'arrowleft') {
      this.pdfPanel.nativeElement.scrollLeft -= 100;
    } else if (e.key.toLowerCase() === 'arrowright') {
      this.pdfPanel.nativeElement.scrollLeft += 100;
    }
  }
}
