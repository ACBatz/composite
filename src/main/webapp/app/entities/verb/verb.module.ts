import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CompositeSharedModule } from 'app/shared';
import {
  VerbComponent,
  VerbDetailComponent,
  VerbUpdateComponent,
  VerbDeletePopupComponent,
  VerbDeleteDialogComponent,
  verbRoute,
  verbPopupRoute
} from './';

const ENTITY_STATES = [...verbRoute, ...verbPopupRoute];

@NgModule({
  imports: [CompositeSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [VerbComponent, VerbDetailComponent, VerbUpdateComponent, VerbDeleteDialogComponent, VerbDeletePopupComponent],
  entryComponents: [VerbComponent, VerbUpdateComponent, VerbDeleteDialogComponent, VerbDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CompositeVerbModule {}
