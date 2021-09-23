import { Component, OnDestroy } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import { map, mergeMap, share, shareReplay } from 'rxjs/operators';
import { Show } from 'src/app/models/show';
import { TvShowsService } from 'src/app/services/tv-shows/tv-shows.service';

@Component({
  selector: 'app-shows-list',
  templateUrl: './shows-list.component.html'
})
export class ShowsListComponent implements OnDestroy {

  private _searchSubject: BehaviorSubject<string> = new BehaviorSubject<string>(undefined);

  private showsList$: Observable<Show[]> = this.tvShowsService.retrieveShowsList().pipe(shareReplay(1));

  _noShowsFoundSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  noShowsFound$: Observable<boolean> = this._noShowsFoundSubject.asObservable();

  showsListWithSearch$: Observable<Show[]> = this._searchSubject.asObservable().pipe(
    mergeMap((searchString) => this.showsList$.pipe(map(showsList => {
      if (!!searchString) {
        return showsList.filter(show => show.name.toLowerCase().includes(searchString.toLowerCase()));
      }
      return showsList;
    })))
  );

  genresList$: Observable<string[]> = this.showsListWithSearch$.pipe(
    map(showsList => showsList.reduce((actual, current) => { actual.push(...current.genres); return actual; }, [])),
    map(genres => [...new Set(genres)]), shareReplay(1)
  );

  finalShowsList$: Observable<any> = combineLatest([this.showsListWithSearch$, this.genresList$]).pipe(
    map(([showsList, genresList]) => {
      const groupByGenre = {};
      genresList.forEach(genre => {
        groupByGenre[genre] = showsList.filter(show => show.genres.includes(genre))
          .sort((current, next) => (current.rating?.average || 0) < (next.rating?.average || 0) && 1 || -1);
      });

      this._noShowsFoundSubject.next(!Object.keys(groupByGenre).length);
      return groupByGenre;
    }),
    share()
  );


  private _seacrhSubscription: Subscription;

  constructor(private tvShowsService: TvShowsService) {
    this._seacrhSubscription = this.tvShowsService.search$.subscribe(searchString => {
      this._searchSubject.next(searchString);
    });
  }

  getNumberOfShows = (shows: Show[]) => shows.length;

  ngOnDestroy() {
    this._seacrhSubscription && this._seacrhSubscription.unsubscribe();
  }
}
