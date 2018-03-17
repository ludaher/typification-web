import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ProductProcess } from '../../model/typification/product-process.model';
import { environment } from '../../../environments/environment';
import { Product } from '../../model/process/product.model';
import { PagingUtil } from '../utilities/pagingUtil';

export class GenericService {
    apiRoot = environment.origin;

    constructor(protected http: HttpClient, protected paging: PagingUtil, protected relativeRoute: string) {

    }

    add<T>(entity: T): Observable<T> {
        const url = `${this.apiRoot}/${this.relativeRoute}`;
        return this.http.put<T>(url, entity);
    }

    update<T>(entity: T): Observable<T> {
        const url = `${this.apiRoot}/${this.relativeRoute}`;
        return this.http.post<T>(url, entity);
    }

    getById<T>(id): Observable<T> {
        const url = `${this.apiRoot}/${this.relativeRoute}/${id}`;
        return this.http.get<T>(url);
    }

    getList<T>(filter, page = null, itemsByPage = null, sortBy = null, descending = null): Observable<T> {
        let url = `${this.apiRoot}/${this.relativeRoute}/?`;
        url += this.paging.getQueryString(filter, page, itemsByPage, sortBy, descending);
        return this.http
            .get<T>(url);
    }

    getSelect(select, filter, page = null, itemsByPage = null, sortBy = null, descending = null): Observable<any> {
        let url = `${this.apiRoot}/${this.relativeRoute}/select/${select}?`;
        url += this.paging.getQueryString(filter, page, itemsByPage, sortBy, descending);
        return this.http
            .get<ProductProcess[]>(url);
    }

}
