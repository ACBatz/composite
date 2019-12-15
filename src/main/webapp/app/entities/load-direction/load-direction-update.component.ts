import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ILoadDirection, LoadDirection } from 'app/shared/model/load-direction.model';
import { LoadDirectionService } from './load-direction.service';

@Component({
  selector: 'jhi-load-direction-update',
  templateUrl: './load-direction-update.component.html'
})
export class LoadDirectionUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    loadDirectionEnum: [null, [Validators.required]]
  });

  constructor(protected loadDirectionService: LoadDirectionService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ loadDirection }) => {
      this.updateForm(loadDirection);
    });
  }

  updateForm(loadDirection: ILoadDirection) {
    this.editForm.patchValue({
      id: loadDirection.id,
      loadDirectionEnum: loadDirection.loadDirectionEnum
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const loadDirection = this.createFromForm();
    if (loadDirection.id !== undefined) {
      this.subscribeToSaveResponse(this.loadDirectionService.update(loadDirection));
    } else {
      this.subscribeToSaveResponse(this.loadDirectionService.create(loadDirection));
    }
  }

  private createFromForm(): ILoadDirection {
    return {
      ...new LoadDirection(),
      id: this.editForm.get(['id']).value,
      loadDirectionEnum: this.editForm.get(['loadDirectionEnum']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILoadDirection>>) {
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
