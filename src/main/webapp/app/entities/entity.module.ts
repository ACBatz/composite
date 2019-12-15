import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'composite',
        loadChildren: () => import('./composite/composite.module').then(m => m.CompositeCompositeModule)
      },
      {
        path: 'property',
        loadChildren: () => import('./property/property.module').then(m => m.CompositePropertyModule)
      },
      {
        path: 'noun',
        loadChildren: () => import('./noun/noun.module').then(m => m.CompositeNounModule)
      },
      {
        path: 'verb',
        loadChildren: () => import('./verb/verb.module').then(m => m.CompositeVerbModule)
      },
      {
        path: 'load',
        loadChildren: () => import('./load/load.module').then(m => m.CompositeLoadModule)
      },
      {
        path: 'environmental-effect',
        loadChildren: () => import('./environmental-effect/environmental-effect.module').then(m => m.CompositeEnvironmentalEffectModule)
      },
      {
        path: 'miscellaneous-constraint',
        loadChildren: () =>
          import('./miscellaneous-constraint/miscellaneous-constraint.module').then(m => m.CompositeMiscellaneousConstraintModule)
      },
      {
        path: 'limit',
        loadChildren: () => import('./limit/limit.module').then(m => m.CompositeLimitModule)
      },
      {
        path: 'unit-of-measure',
        loadChildren: () => import('./unit-of-measure/unit-of-measure.module').then(m => m.CompositeUnitOfMeasureModule)
      },
      {
        path: 'calculation',
        loadChildren: () => import('./calculation/calculation.module').then(m => m.CompositeCalculationModule)
      },
      {
        path: 'calculation-result',
        loadChildren: () => import('./calculation-result/calculation-result.module').then(m => m.CompositeCalculationResultModule)
      },
      {
        path: 'weighting-factor',
        loadChildren: () => import('./weighting-factor/weighting-factor.module').then(m => m.CompositeWeightingFactorModule)
      },
      {
        path: 'load-direction',
        loadChildren: () => import('./load-direction/load-direction.module').then(m => m.CompositeLoadDirectionModule)
      },
      {
        path: 'load-shear',
        loadChildren: () => import('./load-shear/load-shear.module').then(m => m.CompositeLoadShearModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CompositeEntityModule {}
