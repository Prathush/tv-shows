import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { RouterService } from '../router/router.service';
import { TvShowsService } from './tv-shows.service';

describe('TvShowsService', () => {
  let service: TvShowsService;
  const httpClientMock: HttpClient = { get: {} } as HttpClient;
  const routerServiceMock: RouterService = { navigateToError: {} } as RouterService;

  const shows = [
    {
      id: 1,
      name: 'show1'
    },
    {
      id: 2,
      name: 'show2'
    },
    {
      id: 3,
      name: 'show3'
    }
  ];

  beforeEach(() => {
    service = new TvShowsService(httpClientMock, routerServiceMock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve shows list', () => {
    spyOn(httpClientMock, 'get').and.returnValue(of(shows));
    service.retrieveShowsList();
    expect(httpClientMock.get).toHaveBeenCalledTimes(1);
  });

  it('should emit search string provided', () => {
    const searchString: string = 'test';
    service.emitSearch(searchString);
    service.search$.subscribe(search => {
      expect(search).toBe(searchString);
    });
  });
});
