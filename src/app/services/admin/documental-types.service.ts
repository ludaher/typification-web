import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../model/process/product.model';
import { GenericService } from '../utilities/GenericService';
import { PagingUtil } from '../utilities/pagingUtil';

@Injectable()
export class DocumentalTypesService extends GenericService {

  apiRoot = environment.origin;

  constructor(protected http: HttpClient, protected paging: PagingUtil) {
    super(http, paging, 'api/documentalTypes');
  }

  saveFile(product, fileBase64): Observable<any> {
    const object = { ProductId: product, FileBase64: fileBase64 } ;
    console.log(object);
    return this.http.post(`${this.apiRoot}/${this.relativeRoute}/file`, object);
  }
}
