import { Show } from 'src/app/models/show';
import { RouterService } from 'src/app/services/router/router.service';
import { ShowsCarouselComponent } from './shows-carousel.component';

describe('ShowsCarouselComponent', () => {
  let component: ShowsCarouselComponent;
  const routerServiceMock: RouterService = { navigateTo: {} } as RouterService;

  beforeEach(() => {
    component = new ShowsCarouselComponent(routerServiceMock);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have responsive options set on initiation', () => {
    expect(component.responsiveOptions.length).toBe(3);
    expect(component.responsiveOptions[0].breakpoint).toBe('1024px');
    expect(component.responsiveOptions[0].numVisible).toBe(5);
    expect(component.responsiveOptions[0].numScroll).toBe(3);
    expect(component.responsiveOptions[1].breakpoint).toBe('768px');
    expect(component.responsiveOptions[1].numVisible).toBe(3);
    expect(component.responsiveOptions[1].numScroll).toBe(2);
    expect(component.responsiveOptions[2].breakpoint).toBe('560px');
    expect(component.responsiveOptions[2].numVisible).toBe(1);
    expect(component.responsiveOptions[2].numScroll).toBe(1);

  });

  it('should navigate to show details on image click', () => {
    spyOn(routerServiceMock, 'navigateTo');
    const show = new Show();
    component.onImageClick(show);
    expect(routerServiceMock.navigateTo).toHaveBeenCalledTimes(1);
  });
});
