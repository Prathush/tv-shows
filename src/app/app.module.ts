import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShowsCarouselComponent } from './components/shows-carousel/shows-carousel.component';
import { ErrorComponent } from './components/error/error.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './components/search/search.component';
import { ShowDetailsComponent } from './components/show-details/show-details.component';
import { ShowsListComponent } from './components/shows-list/shows-list.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { LazyImageLoaderDirective } from './directives/lazy-image-loader/lazy-image-loader.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SearchComponent,
    ErrorComponent,
    ShowsListComponent,
    ShowsCarouselComponent,
    ShowDetailsComponent,
    SpinnerComponent,
    LazyImageLoaderDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    CarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
