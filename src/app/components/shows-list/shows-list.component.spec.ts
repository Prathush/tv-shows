import { of, Subject } from 'rxjs';
import { Show } from 'src/app/models/show';
import { TvShowsService } from 'src/app/services/tv-shows/tv-shows.service';
import { ShowsListComponent } from './shows-list.component';

describe('ShowsListComponent', () => {
  let component: ShowsListComponent;
  const searchSubject: Subject<string> = new Subject<string>();
  const tvShowsService: TvShowsService = { retrieveShowsList: {}, search$: searchSubject.asObservable() } as TvShowsService;
  const shows = [
    {
      id: 1,
      name: 'show1',
      rating: {
        average: 9.2
      },
      genres: [
        'test1',
        'test2'
      ]
    } as Show,
    {
      id: 2,
      name: 'show2',
      rating: {
        average: 9.5
      },
      genres: [
        'test2',
        'test3'
      ]
    } as Show,
    {
      id: 3,
      name: 'show3',
      rating: {
        average: 9.6
      },
      genres: [
        'test3',
        'test1'
      ]
    } as Show
  ];

  beforeEach(() => {
    spyOn(tvShowsService, 'retrieveShowsList').and.returnValue(of(shows));
    component = new ShowsListComponent(tvShowsService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get number of shows', () => {
    expect(component.getNumberOfShows([new Show()])).toBe(1);
  });

  it('should display shows list with search string filter', done => {
    component = new ShowsListComponent(tvShowsService);
    component.showsListWithSearch$.subscribe(shows => {
      expect(shows.length).toBe(3);
      expect(shows[0].id).toBe(1);
      done();
    });
  });

  it('should display genres list', done => {
    component = new ShowsListComponent(tvShowsService);
    component.genresList$.subscribe(genresList => {
      expect(genresList.length).toBe(3);
      done();
    });
  });

  it('should form final list of shows', done => {
    component = new ShowsListComponent(tvShowsService);
    component.finalShowsList$.subscribe(finalShowsList => {
      expect(finalShowsList).toBeTruthy();
      expect(Object.keys(finalShowsList).length).toBe(3);
      expect(finalShowsList['test1'].length).toBe(2);
      expect(finalShowsList['test2'].length).toBe(2);
      expect(finalShowsList['test3'].length).toBe(2);
      done();
    });
  });

  it('should unsubscribe search subscription on destroy', () => {
    spyOn(component['_seacrhSubscription'], 'unsubscribe');
    component.ngOnDestroy();
    expect(component['_seacrhSubscription'].unsubscribe).toHaveBeenCalledTimes(1);
  });
});
