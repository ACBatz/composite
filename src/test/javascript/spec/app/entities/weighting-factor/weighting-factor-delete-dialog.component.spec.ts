/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CompositeTestModule } from '../../../test.module';
import { WeightingFactorDeleteDialogComponent } from 'app/entities/weighting-factor/weighting-factor-delete-dialog.component';
import { WeightingFactorService } from 'app/entities/weighting-factor/weighting-factor.service';

describe('Component Tests', () => {
  describe('WeightingFactor Management Delete Component', () => {
    let comp: WeightingFactorDeleteDialogComponent;
    let fixture: ComponentFixture<WeightingFactorDeleteDialogComponent>;
    let service: WeightingFactorService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CompositeTestModule],
        declarations: [WeightingFactorDeleteDialogComponent]
      })
        .overrideTemplate(WeightingFactorDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(WeightingFactorDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(WeightingFactorService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
