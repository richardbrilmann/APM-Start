import { IProduct } from './product';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProductService{

    private productUrl = 'api/products/products.json';

    constructor(private http: HttpClient ){}


    getPoducts(): Observable<IProduct[]>{
        return this.http.get< IProduct[] >(this.productUrl).pipe(
            tap(data => console.log('All' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }
    handleError(err: HttpErrorResponse){
        let errorMesage = '';
        if(err.error instanceof ErrorEvent){
            errorMesage = `An error occourd: ${err.error.message}`;
        }
        else{
            errorMesage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMesage);
        return throwError(errorMesage);
    }
}
