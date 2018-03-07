import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { OnDestroy } from '@angular/core';
// import "./safe-subscribe"

export class BaseComponent implements OnDestroy {
    private _subscriptions: Subscription[] = [];
    public ngOnDestroy(): void {
        for (const sub of this._subscriptions) {
            sub.unsubscribe();
        }
    }

    public markForSafeDelete(sub: Subscription) {
        this._subscriptions.push(sub);
    }
}

declare module 'rxjs/Observable' {
        interface Observable<T> {
                safeSubscribe: typeof safeSubscribe;
        }
}


export function safeSubscribe<T>(this: Observable<T>, component: BaseComponent,
        next?: (value: T) => void, error?: (error: T) => void, complete?: () => void, ): Subscription {
        const sub = this.subscribe(next, error, complete);
        component.markForSafeDelete(sub);
        return sub;
}
Observable.prototype.safeSubscribe = safeSubscribe;
