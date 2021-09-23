import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SHOWS_LIST_STEP } from 'src/app/models/route';
import { TvShowsService } from 'src/app/services/tv-shows/tv-shows.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent {

  constructor(private router: Router, private tvShowsService: TvShowsService) { }

  filterList(event) {
    this.tvShowsService.emitSearch(event.target.value);
  }

  showSearchBox = () => this.router && this.router.url === SHOWS_LIST_STEP.url;
}
