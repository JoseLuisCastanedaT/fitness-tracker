import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';

import { CurrentTrainingComponent } from './components/currentTraining/currentTraining.component';
import { NewTrainingComponent } from './components/newTraining/newTraining.component';
import { PastTrainingsComponent } from './components/pastTrainings/pastTrainings.component';
import { TrainingComponent } from './components/training/training.component';
import { StopTrainingComponent } from './components/stopTraining/stopTraining.component';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TrainingRoutingModule } from './training-routing.module';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../store/reducers';
import { trainingReducers } from './store/training.reducer';

@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
    MatCardModule,
    FlexLayoutModule,
    MatButtonModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    TrainingRoutingModule,
    StoreModule.forFeature('ui',reducers),
    StoreModule.forFeature('training', trainingReducers)
  ],
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    StopTrainingComponent,
  ],
  exports: [TrainingComponent],
})
export class TrainingModule {}
