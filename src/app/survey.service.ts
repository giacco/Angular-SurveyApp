import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { QuestionInterface, userAnswer } from './question'

import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  // private REST_API_SERVER: string = "http://192.168.2.53:3000";
  private REST_API_SERVER: string = "http://127.0.0.1:3000/";

  constructor(private httpClient: HttpClient, private _snackBar: MatSnackBar) { }

  public sendGetQuestionRequest(): Observable<QuestionInterface[]> {
    return this.httpClient.get<QuestionInterface[]>(this.REST_API_SERVER, httpOptions)
      .pipe(
        catchError(this.handleError<QuestionInterface[]>('sendGetQuestionRequest', []))
      );
  }
  public sendPostAnswersRequest(answers_id: number[]) : Observable<string[]> {
    const body = JSON.stringify(answers_id);
    return this.httpClient.post<string[]>(this.REST_API_SERVER, body, httpOptions)
    .pipe(
      catchError(this.handleError<string[]>('sendPostAnswersRequest'))
    );
  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);
      console.log(`${operation} failed: ${error.message}`)
      // window.alert(`${operation} failed: ${error.message}`)
      this._snackBar.open(`${operation}, failed: ${error.message}` )
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
