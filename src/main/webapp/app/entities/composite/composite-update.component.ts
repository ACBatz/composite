import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IComposite, Composite } from 'app/shared/model/composite.model';
import { CompositeService } from './composite.service';
import { ILimit } from 'app/shared/model/limit.model';
import { LimitService } from 'app/entities/limit';
import { ICalculationResult } from 'app/shared/model/calculation-result.model';
import { CalculationResultService } from 'app/entities/calculation-result';

@Component({
  selector: 'jhi-composite-update',
  templateUrl: './composite-update.component.html'
})
export class CompositeUpdateComponent implements OnInit {
  isSaving: boolean;

  limits: ILimit[];

  calculationresults: ICalculationResult[];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    limits: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected compositeService: CompositeService,
    protected limitService: LimitService,
    protected calculationResultService: CalculationResultService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ composite }) => {
      this.updateForm(composite);
    });
    this.limitService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ILimit[]>) => mayBeOk.ok),
        map((response: HttpResponse<ILimit[]>) => response.body)
      )
      .subscribe((res: ILimit[]) => (this.limits = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.calculationResultService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICalculationResult[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICalculationResult[]>) => response.body)
      )
      .subscribe((res: ICalculationResult[]) => (this.calculationresults = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(composite: IComposite) {
    this.editForm.patchValue({
      id: composite.id,
      name: composite.name,
      limits: composite.limits
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const composite = this.createFromForm();
    if (composite.id !== undefined) {
      this.subscribeToSaveResponse(this.compositeService.update(composite));
    } else {
      this.subscribeToSaveResponse(this.compositeService.create(composite));
    }
  }

  private createFromForm(): IComposite {
    return {
      ...new Composite(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      limits: this.editForm.get(['limits']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IComposite>>) {
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

  trackCalculationResultById(index: number, item: ICalculationResult) {
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
