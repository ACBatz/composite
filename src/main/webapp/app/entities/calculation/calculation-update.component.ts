import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ICalculation, Calculation } from 'app/shared/model/calculation.model';
import { CalculationService } from './calculation.service';
import { IEnvironmentalEffect } from 'app/shared/model/environmental-effect.model';
import { EnvironmentalEffectService } from 'app/entities/environmental-effect';
import { IMiscellaneousConstraint } from 'app/shared/model/miscellaneous-constraint.model';
import { MiscellaneousConstraintService } from 'app/entities/miscellaneous-constraint';
import { ILoad } from 'app/shared/model/load.model';
import { LoadService } from 'app/entities/load';
import { IWeightingFactor } from 'app/shared/model/weighting-factor.model';
import { WeightingFactorService } from 'app/entities/weighting-factor';
import { INoun } from 'app/shared/model/noun.model';
import { NounService } from 'app/entities/noun';
import { IVerb } from 'app/shared/model/verb.model';
import { VerbService } from 'app/entities/verb';
import { IProperty } from 'app/shared/model/property.model';

@Component({
  selector: 'jhi-calculation-update',
  templateUrl: './calculation-update.component.html'
})
export class CalculationUpdateComponent implements OnInit {
  isSaving: boolean;

  environmentaleffects: IEnvironmentalEffect[];

  miscellaneousconstraints: IMiscellaneousConstraint[];

  loads: ILoad[];

  weightingfactors: IWeightingFactor[];

  nouns: INoun[];

  verbs: IVerb[];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    description: [null, [Validators.maxLength(100)]],
    environmentalEffects: [],
    miscConstraints: [],
    loads: [],
    weightingFactors: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected calculationService: CalculationService,
    protected environmentalEffectService: EnvironmentalEffectService,
    protected miscellaneousConstraintService: MiscellaneousConstraintService,
    protected loadService: LoadService,
    protected weightingFactorService: WeightingFactorService,
    protected nounService: NounService,
    protected verbService: VerbService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ calculation }) => {
      this.updateForm(calculation);
    });
    this.environmentalEffectService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IEnvironmentalEffect[]>) => mayBeOk.ok),
        map((response: HttpResponse<IEnvironmentalEffect[]>) => response.body)
      )
      .subscribe((res: IEnvironmentalEffect[]) => (this.environmentaleffects = res), (res: HttpErrorResponse) => this.onError(res.message));
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
    this.loadService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ILoad[]>) => mayBeOk.ok),
        map((response: HttpResponse<ILoad[]>) => response.body)
      )
      .subscribe((res: ILoad[]) => (this.loads = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.weightingFactorService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IWeightingFactor[]>) => mayBeOk.ok),
        map((response: HttpResponse<IWeightingFactor[]>) => response.body)
      )
      .subscribe((res: IWeightingFactor[]) => (this.weightingfactors = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.nounService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<INoun[]>) => mayBeOk.ok),
        map((response: HttpResponse<INoun[]>) => response.body)
      )
      .subscribe((res: INoun[]) => (this.nouns = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.verbService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IVerb[]>) => mayBeOk.ok),
        map((response: HttpResponse<IVerb[]>) => response.body)
      )
      .subscribe((res: IVerb[]) => (this.verbs = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(calculation: ICalculation) {
    this.editForm.patchValue({
      id: calculation.id,
      name: calculation.name,
      description: calculation.description,
      environmentalEffects: calculation.environmentalEffects,
      miscConstraints: calculation.miscConstraints,
      loads: calculation.loads,
      weightingFactors: calculation.weightingFactors
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const calculation = this.createFromForm();
    if (calculation.id !== undefined) {
      this.subscribeToSaveResponse(this.calculationService.update(calculation));
    } else {
      this.subscribeToSaveResponse(this.calculationService.create(calculation));
    }
  }

  private createFromForm(): ICalculation {
    return {
      ...new Calculation(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      description: this.editForm.get(['description']).value,
      environmentalEffects: this.editForm.get(['environmentalEffects']).value,
      miscConstraints: this.editForm.get(['miscConstraints']).value,
      loads: this.editForm.get(['loads']).value,
      weightingFactors: this.editForm.get(['weightingFactors']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICalculation>>) {
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

  trackEnvironmentalEffectById(index: number, item: IEnvironmentalEffect) {
    return item.id;
  }

  trackMiscellaneousConstraintById(index: number, item: IMiscellaneousConstraint) {
    return item.id;
  }

  trackLoadById(index: number, item: ILoad) {
    return item.id;
  }

  trackWeightingFactorById(index: number, item: IWeightingFactor) {
    return item.id;
  }

  trackNounById(index: number, item: INoun) {
    return item.id;
  }

  trackVerbById(index: number, item: IVerb) {
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

  mapPropertiesToNames(properties: Array<IProperty>) {
    return properties.map(property => property.name).join(', ');
  }
}
