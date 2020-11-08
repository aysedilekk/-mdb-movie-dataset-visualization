import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  endpoint: string = 'http://localhost:8000';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    })
  };
  currentUser = {};

  constructor(
    private http: HttpClient,
    public router: Router
  ) {}

  getMovieCountForGenre() {
    let data;
    let api = `${this.endpoint}/movie-count-for-genre/`;
    return this.http.get(api, this.httpOptions).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  getMovieCountForYear() {
    let data;
    let api = `${this.endpoint}/movie-count-for-year/`;
    return this.http.get(api, this.httpOptions).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  getMostVoted50Movies() {
    let data;
    let api = `${this.endpoint}/most-voted-movies/`;
    return this.http.get(api, this.httpOptions).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  getReviewCountForRandomMovies() {
    let data;
    let api = `${this.endpoint}/review-count-for-random-movies/`;
    return this.http.get(api, this.httpOptions).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
