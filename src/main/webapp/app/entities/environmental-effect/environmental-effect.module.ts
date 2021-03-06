import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CompositeSharedModule } from 'app/shared';
import {
  EnvironmentalEffectComponent,
  EnvironmentalEffectDetailComponent,
  EnvironmentalEffectUpdateComponent,
  EnvironmentalEffectDeletePopupComponent,
  EnvironmentalEffectDeleteDialogComponent,
  environmentalEffectRoute,
  environmentalEffectPopupRoute
} from './';

const ENTITY_STATES = [...environmentalEffectRoute, ...environmentalEffectPopupRoute];

@NgModule({
  imports: [CompositeSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    EnvironmentalEffectComponent,
    EnvironmentalEffectDetailComponent,
    EnvironmentalEffectUpdateComponent,
    EnvironmentalEffectDeleteDialogComponent,
    EnvironmentalEffectDeletePopupComponent
  ],
  entryComponents: [
    EnvironmentalEffectComponent,
    EnvironmentalEffectUpdateComponent,
    EnvironmentalEffectDeleteDialogComponent,
    EnvironmentalEffectDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CompositeEnvironmentalEffectModule {}
