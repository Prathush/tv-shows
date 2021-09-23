import { Router } from '@angular/router';
import { SHOWS_LIST_STEP, SHOW_DETAILS_STEP } from 'src/app/models/route';
import { TvShowsService } from 'src/app/services/tv-shows/tv-shows.service';
import { SearchComponent } from './search.component';


describe('SearchComponent', () => {
  let component: SearchComponent;
  const tvShowsServiceMock: TvShowsService = { emitSearch: {} } as TvShowsService;
  let routerMock: Router = { url: SHOWS_LIST_STEP.url } as Router;

  beforeEach(() => {
    component = new SearchComponent(routerMock, tvShowsServiceMock);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit search string', () => {
    spyOn(tvShowsServiceMock, 'emitSearch');
    const event = {
      target: {
        value: 'test'
      }
    };
    component.filterList(event);
    expect(tvShowsServiceMock.emitSearch).toHaveBeenCalledOnceWith(event.target.value);
  });

  it('should show search field based on router url', () => {
    expect(component.showSearchBox()).toBeTruthy();
    routerMock = { url: SHOW_DETAILS_STEP.url } as Router;
    component = new SearchComponent(routerMock, tvShowsServiceMock);
    expect(component.showSearchBox()).toBeFalsy();
  });
});
