import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ILoadShear, LoadShear } from 'app/shared/model/load-shear.model';
import { LoadShearService } from './load-shear.service';

@Component({
  selector: 'jhi-load-shear-update',
  templateUrl: './load-shear-update.component.html'
})
export class LoadShearUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    loadShearEnum: [null, [Validators.required]]
  });

  constructor(protected loadShearService: LoadShearService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ loadShear }) => {
      this.updateForm(loadShear);
    });
  }

  updateForm(loadShear: ILoadShear) {
    this.editForm.patchValue({
      id: loadShear.id,
      loadShearEnum: loadShear.loadShearEnum
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const loadShear = this.createFromForm();
    if (loadShear.id !== undefined) {
      this.subscribeToSaveResponse(this.loadShearService.update(loadShear));
    } else {
      this.subscribeToSaveResponse(this.loadShearService.create(loadShear));
    }
  }

  private createFromForm(): ILoadShear {
    return {
      ...new LoadShear(),
      id: this.editForm.get(['id']).value,
      loadShearEnum: this.editForm.get(['loadShearEnum']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILoadShear>>) {
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
