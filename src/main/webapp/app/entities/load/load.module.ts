import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CompositeSharedModule } from 'app/shared';
import {
  LoadComponent,
  LoadDetailComponent,
  LoadUpdateComponent,
  LoadDeletePopupComponent,
  LoadDeleteDialogComponent,
  loadRoute,
  loadPopupRoute
} from './';

const ENTITY_STATES = [...loadRoute, ...loadPopupRoute];

@NgModule({
  imports: [CompositeSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [LoadComponent, LoadDetailComponent, LoadUpdateComponent, LoadDeleteDialogComponent, LoadDeletePopupComponent],
  entryComponents: [LoadComponent, LoadUpdateComponent, LoadDeleteDialogComponent, LoadDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CompositeLoadModule {}
