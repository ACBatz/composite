import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CompositeSharedModule } from 'app/shared';
import {
  WeightingFactorComponent,
  WeightingFactorDetailComponent,
  WeightingFactorUpdateComponent,
  WeightingFactorDeletePopupComponent,
  WeightingFactorDeleteDialogComponent,
  weightingFactorRoute,
  weightingFactorPopupRoute
} from './';

const ENTITY_STATES = [...weightingFactorRoute, ...weightingFactorPopupRoute];

@NgModule({
  imports: [CompositeSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    WeightingFactorComponent,
    WeightingFactorDetailComponent,
    WeightingFactorUpdateComponent,
    WeightingFactorDeleteDialogComponent,
    WeightingFactorDeletePopupComponent
  ],
  entryComponents: [
    WeightingFactorComponent,
    WeightingFactorUpdateComponent,
    WeightingFactorDeleteDialogComponent,
    WeightingFactorDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CompositeWeightingFactorModule {}
