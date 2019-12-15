import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CompositeSharedModule } from 'app/shared';
import {
  MiscellaneousConstraintComponent,
  MiscellaneousConstraintDetailComponent,
  MiscellaneousConstraintUpdateComponent,
  MiscellaneousConstraintDeletePopupComponent,
  MiscellaneousConstraintDeleteDialogComponent,
  miscellaneousConstraintRoute,
  miscellaneousConstraintPopupRoute
} from './';

const ENTITY_STATES = [...miscellaneousConstraintRoute, ...miscellaneousConstraintPopupRoute];

@NgModule({
  imports: [CompositeSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    MiscellaneousConstraintComponent,
    MiscellaneousConstraintDetailComponent,
    MiscellaneousConstraintUpdateComponent,
    MiscellaneousConstraintDeleteDialogComponent,
    MiscellaneousConstraintDeletePopupComponent
  ],
  entryComponents: [
    MiscellaneousConstraintComponent,
    MiscellaneousConstraintUpdateComponent,
    MiscellaneousConstraintDeleteDialogComponent,
    MiscellaneousConstraintDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CompositeMiscellaneousConstraintModule {}
