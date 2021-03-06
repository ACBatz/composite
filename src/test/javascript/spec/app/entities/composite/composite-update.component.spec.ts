/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { CompositeTestModule } from '../../../test.module';
import { CompositeUpdateComponent } from 'app/entities/composite/composite-update.component';
import { CompositeService } from 'app/entities/composite/composite.service';
import { Composite } from 'app/shared/model/composite.model';

describe('Component Tests', () => {
  describe('Composite Management Update Component', () => {
    let comp: CompositeUpdateComponent;
    let fixture: ComponentFixture<CompositeUpdateComponent>;
    let service: CompositeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CompositeTestModule],
        declarations: [CompositeUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CompositeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CompositeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CompositeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Composite(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Composite();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
