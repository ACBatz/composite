/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CompositeTestModule } from '../../../test.module';
import { LoadDirectionDeleteDialogComponent } from 'app/entities/load-direction/load-direction-delete-dialog.component';
import { LoadDirectionService } from 'app/entities/load-direction/load-direction.service';

describe('Component Tests', () => {
  describe('LoadDirection Management Delete Component', () => {
    let comp: LoadDirectionDeleteDialogComponent;
    let fixture: ComponentFixture<LoadDirectionDeleteDialogComponent>;
    let service: LoadDirectionService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CompositeTestModule],
        declarations: [LoadDirectionDeleteDialogComponent]
      })
        .overrideTemplate(LoadDirectionDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LoadDirectionDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LoadDirectionService);
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
