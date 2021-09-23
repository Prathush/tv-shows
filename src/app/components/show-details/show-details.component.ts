import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Show } from 'src/app/models/show';
import { RouterService } from 'src/app/services/router/router.service';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html'
})
export class ShowDetailsComponent implements OnInit {

  show: Show;

  constructor(
    private router: Router,
    private routerService: RouterService
  ) {
    this.show = this.router?.getCurrentNavigation()?.extras?.state?.show;
  }

  ngOnInit() {
    if (!this.show) {
      this.routerService.navigateToError(new Error('show details not found'));
    }
  }

  displayShowDetails = () => !!this.show;

  navigateBack() {
    this.routerService.navigateBack();
  }
}
