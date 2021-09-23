import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterService } from './router.service';

describe('RouterService', () => {
  let service: RouterService;
  const locationMock: Location = { back: {}, replaceState: {} } as Location;
  const routeMock: ActivatedRoute = {} as ActivatedRoute;
  const routerMock: Router = { navigate: {} } as Router;

  beforeEach(() => {
    service = new RouterService(locationMock, routeMock, routerMock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should navigate to url provided', () => {
    spyOn(routerMock, 'navigate');
    service.navigateTo('http://test');
    expect(routerMock.navigate).toHaveBeenCalledTimes(1);
  });

  it('should navigate to previous page', () => {
    spyOn(locationMock, 'back');
    service.navigateBack();
    expect(locationMock.back).toHaveBeenCalledTimes(1);
  });

  it('should navigate to error page', () => {
    spyOn(locationMock, 'replaceState');
    spyOn(routerMock, 'navigate');
    service.navigateToError(new Error());
    expect(locationMock.replaceState).toHaveBeenCalledWith('/');
    expect(routerMock.navigate).toHaveBeenCalled();
  });
});
