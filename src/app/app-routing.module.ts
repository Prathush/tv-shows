import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ErrorComponent } from './components/error/error.component';
import { ShowDetailsComponent } from './components/show-details/show-details.component';
import { ShowsListComponent } from './components/shows-list/shows-list.component';

const routes: Routes = [
  {
    path: '', component: AppComponent, children: [
      { path: '', component: ShowsListComponent },
      { path: 'show-details', component: ShowDetailsComponent },
      { path: 'error', component: ErrorComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
