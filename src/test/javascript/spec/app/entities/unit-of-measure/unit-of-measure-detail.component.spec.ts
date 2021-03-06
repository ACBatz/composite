/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CompositeTestModule } from '../../../test.module';
import { UnitOfMeasureDetailComponent } from 'app/entities/unit-of-measure/unit-of-measure-detail.component';
import { UnitOfMeasure } from 'app/shared/model/unit-of-measure.model';

describe('Component Tests', () => {
  describe('UnitOfMeasure Management Detail Component', () => {
    let comp: UnitOfMeasureDetailComponent;
    let fixture: ComponentFixture<UnitOfMeasureDetailComponent>;
    const route = ({ data: of({ unitOfMeasure: new UnitOfMeasure(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CompositeTestModule],
        declarations: [UnitOfMeasureDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(UnitOfMeasureDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UnitOfMeasureDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.unitOfMeasure).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
