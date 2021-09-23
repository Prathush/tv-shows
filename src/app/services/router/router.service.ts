import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ERROR_STEP, SHOWS_LIST_STEP } from 'src/app/models/route';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  navigateTo(url: string, extras = {}) {
    this.router.navigate([url], extras);
  }

  navigateBack() {
    this.location.back();
  }

  navigateToError(error) {
    this.location.replaceState(SHOWS_LIST_STEP.url);
    this.router.navigate([ERROR_STEP.url], {
      state: { errorData: error },
      relativeTo: this.route,
      skipLocationChange: true
    });
  }
}
