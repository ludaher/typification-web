import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ProductProcess } from '../../model/typification/product-process.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Process } from '../../model/process/process.model';
import { TypificationProcess } from '../../model/typification/typification-process.model';
import { DocumentalType } from '../../model/process/documental-type.model';
import { TypificationService } from './typification.service';

@Injectable()
export class ValidationService extends TypificationService {
  apiRoot = environment.origin;

  constructor(public http: HttpClient) {
    super(http);
  }

  getProducts(): Observable<ProductProcess[]> {
    return this.http
      .get<ProductProcess[]>(`${this.apiRoot}/api/ProductProcess/validation`);
  }

  assignProcess(productId): Observable<number> {
    return this.http
      .get<number>(`${this.apiRoot}/api/processes/validation?productId=${productId}`);
  }

  getTypificationProcess(processId): Observable<TypificationProcess> {
    return this.http
      .get<TypificationProcess>(`${this.apiRoot}/api/TypificationProcess/validation/${processId}`);
  }

  saveTypification(processId, page, type1, type2, type3): Observable<any> {
    const body = JSON.stringify(
      {
        ProcessId: processId,
        Page: page,
        DocumentTypeId1: type1,
        DocumentTypeId2: type2,
        DocumentTypeId3: type3
      }
    );
    return this.http.post(`${this.apiRoot}/api/Typifications/validation`, body);
  }
}
