import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ILimit, Limit } from 'app/shared/model/limit.model';
import { LimitService } from './limit.service';
import { IProperty } from 'app/shared/model/property.model';
import { PropertyService } from 'app/entities/property';
import { IComposite } from 'app/shared/model/composite.model';
import { CompositeService } from 'app/entities/composite';
import { IUnitOfMeasure } from 'app/shared/model/unit-of-measure.model';
import { UnitOfMeasureService } from 'app/entities/unit-of-measure';

@Component({
  selector: 'jhi-limit-update',
  templateUrl: './limit-update.component.html'
})
export class LimitUpdateComponent implements OnInit {
  isSaving: boolean;

  properties: IProperty[];

  composites: IComposite[];

  unitofmeasures: IUnitOfMeasure[];

  editForm = this.fb.group({
    id: [],
    maximum: [],
    value: [],
    property: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected limitService: LimitService,
    protected propertyService: PropertyService,
    protected compositeService: CompositeService,
    protected unitOfMeasureService: UnitOfMeasureService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ limit }) => {
      this.updateForm(limit);
    });
    this.propertyService
      .query({ filter: 'limit-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IProperty[]>) => mayBeOk.ok),
        map((response: HttpResponse<IProperty[]>) => response.body)
      )
      .subscribe(
        (res: IProperty[]) => {
          if (!this.editForm.get('property').value || !this.editForm.get('property').value.id) {
            this.properties = res;
          } else {
            this.propertyService
              .find(this.editForm.get('property').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IProperty>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IProperty>) => subResponse.body)
              )
              .subscribe(
                (subRes: IProperty) => (this.properties = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.compositeService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IComposite[]>) => mayBeOk.ok),
        map((response: HttpResponse<IComposite[]>) => response.body)
      )
      .subscribe((res: IComposite[]) => (this.composites = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.unitOfMeasureService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUnitOfMeasure[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUnitOfMeasure[]>) => response.body)
      )
      .subscribe((res: IUnitOfMeasure[]) => (this.unitofmeasures = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(limit: ILimit) {
    this.editForm.patchValue({
      id: limit.id,
      maximum: limit.maximum,
      value: limit.value,
      property: limit.property
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const limit = this.createFromForm();
    if (limit.id !== undefined) {
      this.subscribeToSaveResponse(this.limitService.update(limit));
    } else {
      this.subscribeToSaveResponse(this.limitService.create(limit));
    }
  }

  private createFromForm(): ILimit {
    return {
      ...new Limit(),
      id: this.editForm.get(['id']).value,
      maximum: this.editForm.get(['maximum']).value,
      value: this.editForm.get(['value']).value,
      property: this.editForm.get(['property']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILimit>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackPropertyById(index: number, item: IProperty) {
    return item.id;
  }

  trackCompositeById(index: number, item: IComposite) {
    return item.id;
  }

  trackUnitOfMeasureById(index: number, item: IUnitOfMeasure) {
    return item.id;
  }

  getSelected(selectedVals: Array<any>, option: any) {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
