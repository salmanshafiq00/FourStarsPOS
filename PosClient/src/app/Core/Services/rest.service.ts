import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http'


@Injectable()
export class RestDataService {
    constructor(private http: HttpClient) {

    }

    GetAll<T>(url: string): Observable<T[]> {
        return this.SendRequest<T[]>("GET", url);
    }

    Insert<T>(entry: any, url: string): Observable<T> {   
        return this.SendRequest("POST", url ,entry);
    }

    Update<T>(entry: any, url: string): Observable<T> {
        return this.SendRequest("PUT", url, entry);
    }

    Delete<T>(url: string): Observable<T> {
        return this.SendRequest("DELETE", url);
    }

    GetOne<T>(url:string): Observable<T>{
        return this.SendRequest("GET", url);
    }


    private SendRequest<T>(verb: string, url: string, body?: T): Observable<T> {
        return this.http.request<T>(verb, url, { body: body });
    }
}
