import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IMiscellaneousConstraint, MiscellaneousConstraint } from 'app/shared/model/miscellaneous-constraint.model';
import { MiscellaneousConstraintService } from './miscellaneous-constraint.service';
import { IProperty } from 'app/shared/model/property.model';
import { PropertyService } from 'app/entities/property';
import { ICalculation } from 'app/shared/model/calculation.model';
import { CalculationService } from 'app/entities/calculation';

@Component({
  selector: 'jhi-miscellaneous-constraint-update',
  templateUrl: './miscellaneous-constraint-update.component.html'
})
export class MiscellaneousConstraintUpdateComponent implements OnInit {
  isSaving: boolean;

  properties: IProperty[];

  calculations: ICalculation[];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    maximize: [],
    minimize: [],
    properties: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected miscellaneousConstraintService: MiscellaneousConstraintService,
    protected propertyService: PropertyService,
    protected calculationService: CalculationService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ miscellaneousConstraint }) => {
      this.updateForm(miscellaneousConstraint);
    });
    this.propertyService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IProperty[]>) => mayBeOk.ok),
        map((response: HttpResponse<IProperty[]>) => response.body)
      )
      .subscribe((res: IProperty[]) => (this.properties = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.calculationService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICalculation[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICalculation[]>) => response.body)
      )
      .subscribe((res: ICalculation[]) => (this.calculations = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(miscellaneousConstraint: IMiscellaneousConstraint) {
    this.editForm.patchValue({
      id: miscellaneousConstraint.id,
      name: miscellaneousConstraint.name,
      maximize: miscellaneousConstraint.maximize,
      minimize: miscellaneousConstraint.minimize,
      properties: miscellaneousConstraint.properties
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const miscellaneousConstraint = this.createFromForm();
    if (miscellaneousConstraint.id !== undefined) {
      this.subscribeToSaveResponse(this.miscellaneousConstraintService.update(miscellaneousConstraint));
    } else {
      this.subscribeToSaveResponse(this.miscellaneousConstraintService.create(miscellaneousConstraint));
    }
  }

  private createFromForm(): IMiscellaneousConstraint {
    return {
      ...new MiscellaneousConstraint(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      maximize: this.editForm.get(['maximize']).value,
      minimize: this.editForm.get(['minimize']).value,
      properties: this.editForm.get(['properties']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMiscellaneousConstraint>>) {
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

  trackCalculationById(index: number, item: ICalculation) {
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
