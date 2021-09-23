import { Navigation, Router } from '@angular/router';
import { Show } from 'src/app/models/show';
import { RouterService } from 'src/app/services/router/router.service';
import { ShowDetailsComponent } from './show-details.component';


describe('ShowDetailsComponent', () => {
  let component: ShowDetailsComponent;
  const routerMock: Router = { getCurrentNavigation: {} } as Router;
  const routerServiceMock: RouterService = { navigateToError: {}, navigateBack: {} } as RouterService;
  const extras = {} as Navigation;

  beforeEach(() => {
    spyOn(routerMock, 'getCurrentNavigation').and.returnValue(extras);
    component = new ShowDetailsComponent(routerMock, routerServiceMock);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to error page if show deails not found', () => {
    spyOn(routerServiceMock, 'navigateToError');
    component.ngOnInit();
    expect(routerServiceMock.navigateToError).toHaveBeenCalledOnceWith(new Error('show details not found'));
  });

  it('shoudl display show details', () => {
    expect(component.displayShowDetails()).toBeFalsy();
    component.show = new Show();
    expect(component.displayShowDetails()).toBeTruthy();
  });

  it('should navigate to previous page on back button click', () => {
    spyOn(routerServiceMock, 'navigateBack');
    component.navigateBack();
    expect(routerServiceMock.navigateBack).toHaveBeenCalledTimes(1);
  });
});
