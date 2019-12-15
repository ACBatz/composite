import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CompositeSharedModule } from 'app/shared';
import {
  LoadShearComponent,
  LoadShearDetailComponent,
  LoadShearUpdateComponent,
  LoadShearDeletePopupComponent,
  LoadShearDeleteDialogComponent,
  loadShearRoute,
  loadShearPopupRoute
} from './';

const ENTITY_STATES = [...loadShearRoute, ...loadShearPopupRoute];

@NgModule({
  imports: [CompositeSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    LoadShearComponent,
    LoadShearDetailComponent,
    LoadShearUpdateComponent,
    LoadShearDeleteDialogComponent,
    LoadShearDeletePopupComponent
  ],
  entryComponents: [LoadShearComponent, LoadShearUpdateComponent, LoadShearDeleteDialogComponent, LoadShearDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CompositeLoadShearModule {}
