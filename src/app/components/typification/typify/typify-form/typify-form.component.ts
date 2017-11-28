import {
  Injectable, Component, Input, Output,
  EventEmitter, OnInit, ViewChild, ElementRef,
  TemplateRef, OnDestroy
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { TypificationService } from '../../../../services/typification/typification.service';
import { UserTypification } from '../../../../model/typification/typification.model';
import { TypificationProcess } from '../../../../model/typification/typification-process.model';
import { Router } from '@angular/router';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-typify-form',
  templateUrl: './typify-form.component.html',
  styleUrls: ['./typify-form.component.css']
})

export class TypifyFormComponent implements OnInit, OnDestroy {

  documentsSub: any;
  saveSub: any;
  assignProcessSub: any;

  type1: string;
  type2: string;
  type3: string;
  private currentProcess: TypificationProcess;
  private pdfPage: number;

  @Input() productId: number;
  @Input() processId: number;

  @Input('pdfLoaded')
  set pdfLoaded(value: boolean) {
    this.processing = !value;
    if (value === true) {
      setTimeout(() => {
        this.type1Text.nativeElement.focus();
      }, 300);
    }
  }
  @Input('page')
  set page(value: number) {
    if (!value) { return; }
    this.pdfPage = value;
    this.refreshDocumentalTypes();
  }
  @Input('process')
  set process(value: TypificationProcess) {
    if (!value) { return; }
    this.currentProcess = value;
    this.refreshDocumentalTypes();
  }
  @Output() onTypificationSaved = new EventEmitter<any>();
  @Output() onKeydown = new EventEmitter<any>();

  @ViewChild('type1Text') private type1Text: ElementRef;
  @ViewChild('continueButton') continueButton: ElementRef;
  @ViewChild('continueModal') continueModal: ModalDirective;
  @ViewChild('errorModal') errorModal: ModalDirective;

  modalRef: BsModalRef;
  documentalTypes1: any[];
  documentalTypes2: any[];
  documentalTypes3: any[];

  typeLabel1: string;
  typeLabel2: string;
  typeLabel3: string;
  emptyLabel = 'NO ENCONTRADA';
  error: string;

  processing: boolean;
  validForm: boolean;
  showErrorModal: boolean;
  showContinueModal: boolean;

  constructor(private typificationService: TypificationService,
    private router: Router) {
    this.documentalTypes1 = new Array();
    this.documentalTypes2 = new Array();
    this.documentalTypes3 = new Array();
    this.processing = false;
  }

  ngOnInit() {
    this.documentsSub = (this.typificationService
      .getDocumentTypes(this.productId)
      .subscribe(documentalTypes => {
        for (let i = 0; i < documentalTypes.length; i++) {
          if (documentalTypes[i].group == null
            || documentalTypes[i].group === 0) {
            this.documentalTypes1.push(documentalTypes[i]);
          } else if (documentalTypes[i].group === 1) {
            this.documentalTypes2.push(documentalTypes[i]);
          } else if (documentalTypes[i].group === 2) {
            this.documentalTypes3.push(documentalTypes[i]);
          }
        }
      }));
  }

  ngOnDestroy() {
    this.documentsSub.unsubscribe();
    this.assignProcessSub.unsubscribe();
    this.saveSub.unsubscribe();
  }

  ChangeType1($event): void {
    const tipo = this.documentalTypes1.find(x => x.value.toUpperCase() === $event.toUpperCase());
    this.typeLabel1 = (tipo) ? tipo.label : this.emptyLabel;
  }

  ChangeType2($event): void {
    const tipo = this.documentalTypes2.find(x => x.value.toUpperCase() === $event.toUpperCase());
    this.typeLabel2 = (tipo) ? tipo.label : this.emptyLabel;
  }

  ChangeType3($event): void {
    const tipo = this.documentalTypes3.find(x => x.value.toUpperCase() === $event.toUpperCase());
    this.typeLabel3 = (tipo) ? tipo.label : this.emptyLabel;
  }

  saveTypification() {
    if (!this.validForm || this.processing === true) {
      return;
    }
    if (this.saveSub) { this.saveSub.unsubscribe(); }
    this.saveSub = (this.typificationService
      .saveTypification(this.processId, this.pdfPage, this.type1, this.type2, this.type3)
      .subscribe(
      (data) => {
        // this.processing = false;
        if (data.completed === true) {
          this.showContinueModal = true;
          setTimeout(() => {
            console.log('continue');
            this.continueButton.nativeElement.focus();
          }, 500);
          return;
        }
        if (data.pendingPage > 0) {
          console.log('Pending page ' + this.pdfPage);
          this.pdfPage = data.pendingPage;
          this.onTypificationSaved.emit({ success: true, page: this.pdfPage });
          return;
        }
        this.updateTypifications();
        this.onTypificationSaved.emit({ success: true, page: this.pdfPage + 1 });
      },
      () => {
        this.error = 'Error almacenando la tipificación';
        this.processing = false;
      }
      ));
  }

  assignProcess(productId) {
    if (this.assignProcessSub) { this.assignProcessSub.unsubscribe(); }
    this.assignProcessSub = this.typificationService
      .assignProcess(productId)
      .subscribe(
      data => {
        this.router.navigate(['/typify', productId], { queryParams: { processId: data } });
        this.showContinueModal = false;
      },
      err => {
        this.showContinueModal = false;
        this.processing = false;
        this.showError(err.error.error);
      }
      );
  }

  updateTypifications() {
    if (!this.currentProcess) { return; }
    const typification = new UserTypification('', this.pdfPage, this.type1, this.type2, this.type3, null, null);
    const oldTypification = this.currentProcess.typifications.find(x => x.page === typification.page);
    if (!oldTypification) {
      this.currentProcess.typifications.push(typification);
      return;
    }
    oldTypification.documentTypeId1 = typification.documentTypeId1;
    oldTypification.documentTypeId2 = typification.documentTypeId2;
    oldTypification.documentTypeId3 = typification.documentTypeId3;
  }

  refreshDocumentalTypes() {
    if (!this.currentProcess) { return; }
    const typification = this.currentProcess.typifications.find(x => x.page === this.pdfPage);
    if (!typification) {
      this.type1 = '';
      this.type2 = '';
      this.type3 = '';
    } else {
      this.type1 = typification.documentTypeId1;
      this.type2 = typification.documentTypeId2;
      this.type3 = typification.documentTypeId3;
    }

    this.ChangeType1(this.type1);
    this.ChangeType2(this.type2);
    this.ChangeType3(this.type3);
    setTimeout(() => {
      this.type1Text.nativeElement.focus();
    }, 300);
  }

  type1Class() {
    this.validForm = false;
    if (this.type1 === '') {
      return 'has-danger';
    }
    if (!this.type1) {
      return '';
    }
    if (this.typeLabel1 === this.emptyLabel) {
      return 'has-warning';
    }
    this.validForm = true;
    return 'has-success';
  }

  type2Class() {
    if (this.type2 !== '' && this.typeLabel2 === this.emptyLabel) {
      this.validForm = false;
      return 'has-warning';
    }
    return 'has-success';
  }

  type3Class() {
    if (this.type3 !== '' && this.typeLabel3 === this.emptyLabel) {
      this.validForm = false;
      return 'has-warning';
    }
    return 'has-success';
  }

  onKeydownHandler(even) {
    this.onKeydown.emit(even);
  }

  showError(error: string) {
    this.error = error;
    this.showErrorModal = true;
  }

  continue() {
    this.assignProcess(this.productId);
  }

  goToList() {
    this.router.navigate(['/typification']);
  }
}
