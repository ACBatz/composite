import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CompositeSharedModule } from 'app/shared';
import {
  PropertyComponent,
  PropertyDetailComponent,
  PropertyUpdateComponent,
  PropertyDeletePopupComponent,
  PropertyDeleteDialogComponent,
  propertyRoute,
  propertyPopupRoute
} from './';

const ENTITY_STATES = [...propertyRoute, ...propertyPopupRoute];

@NgModule({
  imports: [CompositeSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PropertyComponent,
    PropertyDetailComponent,
    PropertyUpdateComponent,
    PropertyDeleteDialogComponent,
    PropertyDeletePopupComponent
  ],
  entryComponents: [PropertyComponent, PropertyUpdateComponent, PropertyDeleteDialogComponent, PropertyDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CompositePropertyModule {}
