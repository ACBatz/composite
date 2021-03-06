import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CompositeSharedModule } from 'app/shared';
import {
  LoadDirectionComponent,
  LoadDirectionDetailComponent,
  LoadDirectionUpdateComponent,
  LoadDirectionDeletePopupComponent,
  LoadDirectionDeleteDialogComponent,
  loadDirectionRoute,
  loadDirectionPopupRoute
} from './';

const ENTITY_STATES = [...loadDirectionRoute, ...loadDirectionPopupRoute];

@NgModule({
  imports: [CompositeSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    LoadDirectionComponent,
    LoadDirectionDetailComponent,
    LoadDirectionUpdateComponent,
    LoadDirectionDeleteDialogComponent,
    LoadDirectionDeletePopupComponent
  ],
  entryComponents: [
    LoadDirectionComponent,
    LoadDirectionUpdateComponent,
    LoadDirectionDeleteDialogComponent,
    LoadDirectionDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CompositeLoadDirectionModule {}
