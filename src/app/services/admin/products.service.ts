import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ProductProcess } from '../../model/typification/product-process.model';
import { environment } from '../../../environments/environment';
import { Product } from '../../model/process/product.model';
import { PagingUtil } from '../utilities/pagingUtil';
import { GenericService } from '../utilities/GenericService';

@Injectable()
export class ProductsService extends GenericService {
  apiRoot = environment.origin;

  constructor(public http: HttpClient, protected paging: PagingUtil) {
    super(http, paging, 'api/products');
  }

  // getProduct(productId): Observable<Product> {
  //   const url = `${this.apiRoot}/api/products/${productId}`;
  //   return this.http.get<Product>(url);
  // }

  // getProducts(filter, page, itemsByPage, sortBy, isDescenderntOrder): Observable<any> {
  //   let url = `${this.apiRoot}/api/products?`;
  //   url += this.paging.getQueryString(filter, page, itemsByPage, sortBy, isDescenderntOrder);
  //   return this.http
  //     .get(`${this.apiRoot}/api/products`);
  // }

  // getProductSelect(select, filter, page, itemsByPage, sortBy, isDescenderntOrder): Observable<any> {
  //   let url = `${this.apiRoot}/api/products/select/${select}?`;
  //   url += this.paging.getQueryString(filter, page, itemsByPage, sortBy, isDescenderntOrder);
  //   return this.http
  //     .get<ProductProcess[]>(url);
  // }

}
