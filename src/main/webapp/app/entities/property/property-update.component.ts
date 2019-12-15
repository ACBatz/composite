import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IProperty, Property } from 'app/shared/model/property.model';
import { PropertyService } from './property.service';
import { ILimit } from 'app/shared/model/limit.model';
import { LimitService } from 'app/entities/limit';
import { IWeightingFactor } from 'app/shared/model/weighting-factor.model';
import { WeightingFactorService } from 'app/entities/weighting-factor';
import { IMiscellaneousConstraint } from 'app/shared/model/miscellaneous-constraint.model';
import { MiscellaneousConstraintService } from 'app/entities/miscellaneous-constraint';

@Component({
  selector: 'jhi-property-update',
  templateUrl: './property-update.component.html'
})
export class PropertyUpdateComponent implements OnInit {
  isSaving: boolean;

  limits: ILimit[];

  weightingfactors: IWeightingFactor[];

  miscellaneousconstraints: IMiscellaneousConstraint[];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected propertyService: PropertyService,
    protected limitService: LimitService,
    protected weightingFactorService: WeightingFactorService,
    protected miscellaneousConstraintService: MiscellaneousConstraintService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ property }) => {
      this.updateForm(property);
    });
    this.limitService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ILimit[]>) => mayBeOk.ok),
        map((response: HttpResponse<ILimit[]>) => response.body)
      )
      .subscribe((res: ILimit[]) => (this.limits = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.weightingFactorService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IWeightingFactor[]>) => mayBeOk.ok),
        map((response: HttpResponse<IWeightingFactor[]>) => response.body)
      )
      .subscribe((res: IWeightingFactor[]) => (this.weightingfactors = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.miscellaneousConstraintService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IMiscellaneousConstraint[]>) => mayBeOk.ok),
        map((response: HttpResponse<IMiscellaneousConstraint[]>) => response.body)
      )
      .subscribe(
        (res: IMiscellaneousConstraint[]) => (this.miscellaneousconstraints = res),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(property: IProperty) {
    this.editForm.patchValue({
      id: property.id,
      name: property.name
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const property = this.createFromForm();
    if (property.id !== undefined) {
      this.subscribeToSaveResponse(this.propertyService.update(property));
    } else {
      this.subscribeToSaveResponse(this.propertyService.create(property));
    }
  }

  private createFromForm(): IProperty {
    return {
      ...new Property(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProperty>>) {
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

  trackLimitById(index: number, item: ILimit) {
    return item.id;
  }

  trackWeightingFactorById(index: number, item: IWeightingFactor) {
    return item.id;
  }

  trackMiscellaneousConstraintById(index: number, item: IMiscellaneousConstraint) {
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
