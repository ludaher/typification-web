import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ProductProcess } from '../../model/typification/product-process.model';
import { environment } from '../../../environments/environment';
import { Process } from '../../model/process/process.model';
import { DocumentalType } from '../../model/process/documental-type.model';
import { TypificationProcess } from '../../model/typification/typification-process.model';
import { AppSettingsService } from '../settings/app-settings.service';


@Injectable()
export class TypificationService {
  apiRoot = environment.origin;

  constructor(public http: HttpClient) { }

  getProducts(): Observable<ProductProcess[]> {
    return this.http
          .get<ProductProcess[]>(`${this.apiRoot}/api/ProductProcess/typification`);
  }
  assignProcess(productId): Observable<number> {
    return this.http
          .get<number>(`${this.apiRoot}/api/processes/typification?productId=${productId}`);
  }
  getProcess(processId): Observable<Process> {
    return this.http
          .get<Process>(`${this.apiRoot}/api/processes/${processId}`);
  }

  getTypificationProcess(processId): Observable<TypificationProcess> {
    return this.http
          .get<TypificationProcess>(`${this.apiRoot}/api/TypificationProcess/typification/${processId}`);
  }

  getDocumentTypes(productId): Observable<any> {
    return this.http.get<any>(`${this.apiRoot}/api/DocumentalTypes?filter=ProductId,13,${productId}` );
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
    return this.http.post(`${this.apiRoot}/api/Typifications/typification`, body);
  }
}
