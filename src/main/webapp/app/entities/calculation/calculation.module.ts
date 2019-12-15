import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CompositeSharedModule } from 'app/shared';
import {
  CalculationComponent,
  CalculationDetailComponent,
  CalculationUpdateComponent,
  CalculationDeletePopupComponent,
  CalculationDeleteDialogComponent,
  calculationRoute,
  calculationPopupRoute
} from './';

const ENTITY_STATES = [...calculationRoute, ...calculationPopupRoute];

@NgModule({
  imports: [CompositeSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    CalculationComponent,
    CalculationDetailComponent,
    CalculationUpdateComponent,
    CalculationDeleteDialogComponent,
    CalculationDeletePopupComponent
  ],
  entryComponents: [CalculationComponent, CalculationUpdateComponent, CalculationDeleteDialogComponent, CalculationDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CompositeCalculationModule {}
