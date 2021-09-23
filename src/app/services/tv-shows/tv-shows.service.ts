import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { Show } from 'src/app/models/show';
import { RouterService } from '../router/router.service';

@Injectable({
  providedIn: 'root'
})
export class TvShowsService {

  private _showsUrl: string = "https://api.tvmaze.com/shows";

  private _searchSubject: Subject<string> = new Subject<string>();

  search$: Observable<string> = this._searchSubject.asObservable();

  constructor(
    private httpClient: HttpClient,
    private routerService: RouterService
  ) { }

  retrieveShowsList(): Observable<Show[]> {
    return this.httpClient.get<Show[]>(this._showsUrl).pipe(map(shows => {
      shows.forEach(show => Object.assign(new Show(), show));
      return shows;
    }), retry(3), catchError(err => this.handleError(err)));
  }

  emitSearch(value: string) {
    this._searchSubject.next(value);
  }

  private handleError(error) {
    this.routerService.navigateToError(error);
    return throwError(error);
  }
}
