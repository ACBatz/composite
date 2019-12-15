import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CompositeSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [CompositeSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [CompositeSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CompositeSharedModule {
  static forRoot() {
    return {
      ngModule: CompositeSharedModule
    };
  }
}
