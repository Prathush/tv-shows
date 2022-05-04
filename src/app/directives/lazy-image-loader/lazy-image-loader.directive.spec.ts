import { ElementRef } from '@angular/core';
import { LazyImageLoaderDirective } from './lazy-image-loader.directive';

describe('LazyImageLoaderDirective', () => {

  const elementRef = { nativeElement: { setAttribute: {} } } as ElementRef;
  let directive;

  beforeEach(() => {
    spyOn(elementRef.nativeElement, 'setAttribute');
    directive = new LazyImageLoaderDirective(elementRef);

  });

  it('should create an instance and set img attribute', () => {
    expect(directive).toBeTruthy();
    expect(elementRef.nativeElement.setAttribute).toHaveBeenCalled();
  });
});
