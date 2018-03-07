import { Injectable } from '@angular/core';
@Injectable()
export class PagingUtil {
    public getQueryString(filter, page, itemsByPage, sortBy, descending): string {
        let url = 'a=1';
        if (filter && filter != null) {
            url += `&filter=${filter}`;
        }
        if (page && page != null) {
            url += `&page=${page}`;
        }
        if (itemsByPage && itemsByPage != null) {
            url += `&itemsByPage=${itemsByPage}`;
        }
        if (sortBy && sortBy != null) {
            url += `&sortBy=${sortBy}`;
        }
        if (descending && descending != null) {
            url += `&descending=${descending}`;
        }
        return url;
    }
}
