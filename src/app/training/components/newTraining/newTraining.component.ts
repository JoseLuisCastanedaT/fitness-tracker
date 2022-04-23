import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { isLoadingSelector } from 'src/app/store/selectors';

import { TrainingService } from '../../services/training.service';
import { ExerciseInterface } from '../../types/exercise.interface';

@Component({
  selector: 'ft-new-training',
  templateUrl: './newTraining.component.html',
  styleUrls: ['./newTraining.component.css'],
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: ExerciseInterface[] = [];
  isLoading$ : Observable<boolean>;

  private exerciseSubscription: Subscription;
  private loadingSubscription: Subscription;

  constructor(
    private trainingService: TrainingService,
    private store: Store
  ) {}

  ngOnInit() {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))

    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(
      (exercises) => {
        this.exercises = exercises;
      }
    );
    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }

  ngOnDestroy(): void {
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }

  onStartTraining(form: NgForm): void {
    this.trainingService.startExercise(form.value.exercise);
  }
}
