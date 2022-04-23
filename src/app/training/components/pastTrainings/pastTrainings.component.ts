import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Subscription } from 'rxjs';
import { TrainingService } from '../../services/training.service';
import { ExerciseInterface } from '../../types/exercise.interface';

@Component({
  selector: 'ft-past-trainings',
  templateUrl: './pastTrainings.component.html',
  styleUrls: ['./pastTrainings.component.css'],
})
export class PastTrainingsComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  displayedColumns = ['date', 'name', 'duration', 'caloriesBurn', 'state'];
  //Notice we pass ExerciseInterface and not ExerciseInterface[]
  dataSource = new MatTableDataSource<ExerciseInterface>();
  private exerciseChangedSubscription: Subscription;

  @ViewChild(MatSort) matSort: MatSort;
  @ViewChild(MatPaginator) matPaginator: MatPaginator;

  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.exerciseChangedSubscription =
      this.trainingService.finishedExercisesChanged.subscribe(
        (exercises: ExerciseInterface[]) => {
          this.dataSource.data = exercises;
          console.log('dataSource.data', this.dataSource.data);
        }
      );
    this.trainingService.fetchCompletedOrCancelledExercises();
  }

  ngOnDestroy(): void {
    if (this.exerciseChangedSubscription) {
      this.exerciseChangedSubscription.unsubscribe();
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.matSort;
    this.dataSource.paginator = this.matPaginator;
  }

  doFilter(filteredValue: string) {
    this.dataSource.filter = filteredValue.trim().toLowerCase();
  }
}
