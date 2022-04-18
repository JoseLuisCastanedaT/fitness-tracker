import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ExerciseInterface } from '../types/exercise.interface';

@Injectable()
export class TrainingService {
  exerciseChanged = new Subject<ExerciseInterface>();

  private availableExercises: ExerciseInterface[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, caloriesBurn: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, caloriesBurn: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, caloriesBurn: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, caloriesBurn: 8 },
  ];

  private runningExercise: ExerciseInterface;
  private exercises: ExerciseInterface[] = [];

  getAvailableExercises() {
    //'slice' creates a copy, making sure we don't manipulate the private variable
    return this.availableExercises.slice();
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(
      (ex) => ex.id === selectedId
    );
    this.exerciseChanged.next({ ...this.runningExercise });
  }

  completeExercise() {
    this.exercises.push({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed',
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.exercises.push({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      caloriesBurn: this.runningExercise.caloriesBurn * (progress / 100),
      date: new Date(),
      state: 'cancelled',
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
    console.log("exerciseChanged",this.exerciseChanged)
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  getCompletedOrCancelledExercises() {
    return this.exercises.slice();
  }
}
