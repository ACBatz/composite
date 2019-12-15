import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CompositeSharedModule } from 'app/shared';
import {
  CalculationResultComponent,
  CalculationResultDetailComponent,
  CalculationResultUpdateComponent,
  CalculationResultDeletePopupComponent,
  CalculationResultDeleteDialogComponent,
  calculationResultRoute,
  calculationResultPopupRoute
} from './';

const ENTITY_STATES = [...calculationResultRoute, ...calculationResultPopupRoute];

@NgModule({
  imports: [CompositeSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    CalculationResultComponent,
    CalculationResultDetailComponent,
    CalculationResultUpdateComponent,
    CalculationResultDeleteDialogComponent,
    CalculationResultDeletePopupComponent
  ],
  entryComponents: [
    CalculationResultComponent,
    CalculationResultUpdateComponent,
    CalculationResultDeleteDialogComponent,
    CalculationResultDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CompositeCalculationResultModule {}
