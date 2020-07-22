import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams, HttpRequest } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
// import { FileUploader, FileSelectDirective } from 'ng2-file-upload';

import { Product } from './../models/product.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:3000/api/products';

@Injectable({
  providedIn: 'root'
})

export class ProductApiService {

  // tslint:disable-next-line: typedef
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  constructor(
    private http: HttpClient
  ) { }

  // private handleError(error: HttpErrorResponse): any {
  //   if (error.error instanceof ErrorEvent) {
  //     console.error('An error occurred:', error.error.message);
  //   } else {
  //     console.error(
  //       `Backend returned code ${error.status}, ` +
  //       `body was: ${error.error}`);
  //   }
  //   return throwError(
  //     'Something bad happened; please try again later.');
  // }

    // tslint:disable-next-line: variable-name
  updateProduct(_id: any, data: any, image: any): Observable<any> {

    const img = typeof(image) === 'string' ? data.productImg : image;
    // console.log(data);

    const formData = new FormData();
    formData.set('name', data.productName);
    formData.set('description', data.productDesc);
    formData.set('content', data.productContent);
    formData.set('slug', data.productName.split(' ').join('-'));
    formData.set('image', img);

    const header = new HttpHeaders();
    const params = new HttpParams();

    header.append('Content-Type', 'multipart/form-data');
    header.append('Accept', 'application/json');

    const options = {
      params,
      reportProgress: true,
      headers: header
    };

    const url = `${apiUrl}/${_id}`;
    // for (data of formData) {
    //   console.log(data);
    // }
    // return of(formData);
    return this.http.put<Product>(url, formData, options)
      .pipe(
        tap(_ => console.log('Data updated')),
        catchError(this.handleError('updateProduct'))
      );

    // return this.http.put(url, product, httpOptions).pipe(
    //   tap(_ => console.log(`updated product id=${_id}`)),
    //   catchError(this.handleError<any>('updateProduct'))
    // );
  }

  // Add Product
  addProduct(data: Product, image: File): Observable<any> {
    const formData = new FormData();
    formData.set('image', image);
    formData.set('name', data.name);
    formData.set('description', data.description);
    formData.set('content', data.content);
    formData.set('slug', data.name.split(' ').join('-'));

    const header = new HttpHeaders();
    const params = new HttpParams();

    header.append('Content-Type', 'multipart/form-data');
    header.append('Accept', 'application/json');

    const options = {
      params,
      reportProgress: true,
      headers: header
    };
    // const req = new HttpRequest('POST', apiUrl, formData, options);
    // return this.http.request(req);
    // console.log(formData.getAll);
    return this.http.post<Product>(apiUrl, formData, options)
      .pipe(
        tap(_ => console.log('Data saved')),
        catchError(this.handleError('addProduct'))
      );
    // for (const forms of formData) {
    //     console.log(forms);
    // }
    // return of(data);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(apiUrl)
      .pipe(
        tap(product => console.log('fetched products')),
        catchError(this.handleError('getProducts', []))
      );
  }

  getProduct(slug: string): Observable<Product> {
    const url = `${apiUrl}/${slug}`;
    return this.http.get<Product>(url).pipe(
      tap(_ => console.log(`fetched product slug=${slug}`)),
      catchError(this.handleError<Product>(`getProduct slug=${slug}`))
    );
  }

  // addProduct(product: Product): Observable<Product> {
  //   return this.http.post<Product>(apiUrl, product, httpOptions).pipe(
  //     tap((prod: Product) => console.log(`added product`)),
  //     catchError(this.handleError<Product>('addProduct'))
  //   );
  // }



  // tslint:disable-next-line: variable-name
  deleteProduct(_id: any): Observable<Product> {
    const url = `${apiUrl}/${_id}`;
    return this.http.delete<Product>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted product id=${_id}`)),
      catchError(this.handleError<Product>('deleteProduct'))
    );
  }
}
