import { Component, Input } from '@angular/core';
import { ResponsiveOption } from 'src/app/models/responsive-option';
import { SHOW_DETAILS_STEP } from 'src/app/models/route';
import { Show } from 'src/app/models/show';
import { RouterService } from 'src/app/services/router/router.service';

@Component({
  selector: 'app-shows-carousel',
  templateUrl: './shows-carousel.component.html',
  styleUrls: ['./shows-carousel.component.scss']
})
export class ShowsCarouselComponent {
  @Input()
  shows: Show[];

  responsiveOptions: ResponsiveOption[];

  constructor(private routerService: RouterService) {
    this.responsiveOptions = [
      new ResponsiveOption('1024px', 5, 3), new ResponsiveOption('768px', 3, 2), new ResponsiveOption('560px', 1, 1)
    ];
  }

  onImageClick(show: Show) {
    this.routerService.navigateTo(SHOW_DETAILS_STEP.url, { state: { show: show } });
  }
}
