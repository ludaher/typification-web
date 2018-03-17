import {
  Injectable, Component, Input, Output,
  EventEmitter, OnInit, ViewChild, ElementRef,
  TemplateRef, OnDestroy
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ValidationService } from '../../../../services/typification/validation.service';
import { UserTypification } from '../../../../model/typification/typification.model';
import { TypificationProcess } from '../../../../model/typification/typification-process.model';
import { Router } from '@angular/router';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { TypifyFormComponent } from '../../../typification/typify/typify-form/typify-form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-validate-form',
  templateUrl: './validate-form.component.html',
  styleUrls: ['./validate-form.component.css']
})

export class ValidateFormComponent extends TypifyFormComponent {

  constructor(protected validationService: ValidationService,
    protected router: Router,
    protected modalService: NgbModal) {
    super(validationService, router, modalService);
    this.documentalTypes1 = new Array();
    this.documentalTypes2 = new Array();
    this.documentalTypes3 = new Array();
    this.processing = false;
    this.navigateAfterAssign = '/validate';
  }

  statusType1: string;
  statusType2: string;
  statusType3: string;

  type1Typification1: string;
  type2Typification1: string;
  type3Typification1: string;

  type1Typification2: string;
  type2Typification2: string;
  type3Typification2: string;

  typification: UserTypification;

  refreshDocumentalTypes() {
    if (!this.currentProcess || !this.pdfPage) { return; }
    this.typification = this.currentProcess.typifications.find(x => x.page === this.pdfPage);
    if (!this.typification) { return; }

    if (this.typification.typification1 && this.typification.typification2) {

      if (this.typification.typification1.documentTypeId1 === this.typification.typification2.documentTypeId1) {
        this.statusType1 = 'fa-check';
      } else {
        this.statusType1 = 'fa-times';
      }
      if (this.typification.typification1.documentTypeId2 === this.typification.typification2.documentTypeId2) {
        this.statusType2 = 'fa-check';
      } else {
        this.statusType2 = 'fa-times';
      }
      if (this.typification.typification1.documentTypeId3 === this.typification.typification2.documentTypeId3) {
        this.statusType3 = 'fa-check';
      } else {
        this.statusType3 = 'fa-times';
      }
    } else {
      this.statusType1 = this.statusType2 = this.statusType3 = 'fa-check';
    }

    if (this.typification.typification1) {
      this.type1Typification1 = this.typification.typification1.documentTypeId1;
      this.type2Typification1 = this.typification.typification1.documentTypeId2;
      this.type3Typification1 += this.typification.typification1.documentTypeId3;
    }
    if (this.typification.typification2) {
      this.type1Typification2 = this.typification.typification2.documentTypeId1;
      this.type2Typification2 = this.typification.typification2.documentTypeId2;
      this.type3Typification2 += this.typification.typification2.documentTypeId3;
    }
    super.refreshDocumentalTypes();
  }

  type1Class() {
    this.validForm = false;
    if (this.type1 === '' || (this.type1 !== this.type1Typification1 && this.type1 !== this.type1Typification2)) {
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
    if ((this.type2 !== this.type2Typification1 && this.type2 !== this.type2Typification2)) {
      this.validForm = false;
      return 'has-warning';
    }
    return 'has-success';
  }

  type3Class() {
    if ((this.type3 !== this.type3Typification1 && this.type3 !== this.type3Typification2)) {
      this.validForm = false;
      return 'has-warning';
    }
    return 'has-success';
  }

  goToList() {
    this.router.navigate(['/validation']);
  }
}
