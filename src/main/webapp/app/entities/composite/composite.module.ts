import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CompositeSharedModule } from 'app/shared';
import {
  CompositeComponent,
  CompositeDetailComponent,
  CompositeUpdateComponent,
  CompositeDeletePopupComponent,
  CompositeDeleteDialogComponent,
  compositeRoute,
  compositePopupRoute
} from './';

const ENTITY_STATES = [...compositeRoute, ...compositePopupRoute];

@NgModule({
  imports: [CompositeSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    CompositeComponent,
    CompositeDetailComponent,
    CompositeUpdateComponent,
    CompositeDeleteDialogComponent,
    CompositeDeletePopupComponent
  ],
  entryComponents: [CompositeComponent, CompositeUpdateComponent, CompositeDeleteDialogComponent, CompositeDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CompositeCompositeModule {}
