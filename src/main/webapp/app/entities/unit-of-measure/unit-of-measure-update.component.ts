import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IUnitOfMeasure, UnitOfMeasure } from 'app/shared/model/unit-of-measure.model';
import { UnitOfMeasureService } from './unit-of-measure.service';

@Component({
  selector: 'jhi-unit-of-measure-update',
  templateUrl: './unit-of-measure-update.component.html'
})
export class UnitOfMeasureUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]]
  });

  constructor(protected unitOfMeasureService: UnitOfMeasureService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ unitOfMeasure }) => {
      this.updateForm(unitOfMeasure);
    });
  }

  updateForm(unitOfMeasure: IUnitOfMeasure) {
    this.editForm.patchValue({
      id: unitOfMeasure.id,
      name: unitOfMeasure.name
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const unitOfMeasure = this.createFromForm();
    if (unitOfMeasure.id !== undefined) {
      this.subscribeToSaveResponse(this.unitOfMeasureService.update(unitOfMeasure));
    } else {
      this.subscribeToSaveResponse(this.unitOfMeasureService.create(unitOfMeasure));
    }
  }

  private createFromForm(): IUnitOfMeasure {
    return {
      ...new UnitOfMeasure(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUnitOfMeasure>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
