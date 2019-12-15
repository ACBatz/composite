import { NgModule } from '@angular/core';

import { CompositeSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
  imports: [CompositeSharedLibsModule],
  declarations: [JhiAlertComponent, JhiAlertErrorComponent],
  exports: [CompositeSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class CompositeSharedCommonModule {}
