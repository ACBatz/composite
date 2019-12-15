import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ILoad, Load } from 'app/shared/model/load.model';
import { LoadService } from './load.service';
import { ILoadShear } from 'app/shared/model/load-shear.model';
import { LoadShearService } from 'app/entities/load-shear';
import { ILoadDirection } from 'app/shared/model/load-direction.model';
import { LoadDirectionService } from 'app/entities/load-direction';
import { ICalculation } from 'app/shared/model/calculation.model';
import { CalculationService } from 'app/entities/calculation';

@Component({
  selector: 'jhi-load-update',
  templateUrl: './load-update.component.html'
})
export class LoadUpdateComponent implements OnInit {
  isSaving: boolean;

  loadshears: ILoadShear[];

  loaddirections: ILoadDirection[];

  calculations: ICalculation[];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    isTensileOrCompressive: [],
    isShear: [],
    loadShear: [],
    loadDirection: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected loadService: LoadService,
    protected loadShearService: LoadShearService,
    protected loadDirectionService: LoadDirectionService,
    protected calculationService: CalculationService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ load }) => {
      this.updateForm(load);
    });
    this.loadShearService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ILoadShear[]>) => mayBeOk.ok),
        map((response: HttpResponse<ILoadShear[]>) => response.body)
      )
      .subscribe((res: ILoadShear[]) => (this.loadshears = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.loadDirectionService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ILoadDirection[]>) => mayBeOk.ok),
        map((response: HttpResponse<ILoadDirection[]>) => response.body)
      )
      .subscribe((res: ILoadDirection[]) => (this.loaddirections = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.calculationService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICalculation[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICalculation[]>) => response.body)
      )
      .subscribe((res: ICalculation[]) => (this.calculations = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(load: ILoad) {
    this.editForm.patchValue({
      id: load.id,
      name: load.name,
      isTensileOrCompressive: load.isTensileOrCompressive,
      isShear: load.isShear,
      loadShear: load.loadShear,
      loadDirection: load.loadDirection
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const load = this.createFromForm();
    if (load.id !== undefined) {
      this.subscribeToSaveResponse(this.loadService.update(load));
    } else {
      this.subscribeToSaveResponse(this.loadService.create(load));
    }
  }

  private createFromForm(): ILoad {
    return {
      ...new Load(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      isTensileOrCompressive: this.editForm.get(['isTensileOrCompressive']).value,
      isShear: this.editForm.get(['isShear']).value,
      loadShear: this.editForm.get(['loadShear']).value,
      loadDirection: this.editForm.get(['loadDirection']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILoad>>) {
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

  trackLoadShearById(index: number, item: ILoadShear) {
    return item.id;
  }

  trackLoadDirectionById(index: number, item: ILoadDirection) {
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
