import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable()
export class EmitService {
    private _listners = new Subject<any>();

    listen(): Observable<any> {
       return this._listners.asObservable();
    }

    reloadOrganizationDetails(filterBy: string) {
       this._listners.next(filterBy);
    }

}