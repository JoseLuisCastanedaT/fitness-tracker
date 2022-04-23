import { Injectable } from '@angular/core';
import { collection, Firestore, getDocs } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';

import {
  addDoc,
  onSnapshot,
  query,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import { Subject } from 'rxjs';
import { UIService } from 'src/app/shared/services/ui.service';
import { fetchAvailableExercisesAction, fetchAvailableExercisesFailureAction, fetchAvailableExercisesSuccessAction } from 'src/app/store/actions/fetchAvailableExercises.action';
import { finishCurrentExercise, startNewExerciseAction, stopCurrentExerciseAction } from '../store/actions/startNewExercise.action';
import { ExerciseInterface } from '../types/exercise.interface';

@Injectable()
export class TrainingService {
  exerciseChanged = new Subject<ExerciseInterface>();
  exercisesChanged = new Subject<ExerciseInterface[]>();
  finishedExercisesChanged = new Subject<ExerciseInterface[]>();

  private availableExercises: ExerciseInterface[] = [];
  private runningExercise: ExerciseInterface;

  constructor(private firestore: Firestore, private uiService: UIService, private store: Store) {}

  async fetchAvailableExercises() {
    var itemsProcessed = 0;
    this.availableExercises = [];

    this.store.dispatch(fetchAvailableExercisesAction())

    const q = query(collection(this.firestore, 'availableExercises'));

    const querySnapshots = await getDocs(q).catch((error) => {
      this.store.dispatch(fetchAvailableExercisesFailureAction());
      this.uiService.showSnackbar(
        'Fetching exercises failed, please try again later',
        null,
        3000
      );
      this.exercisesChanged.next(null)
    });

    if (querySnapshots) {
      querySnapshots.forEach((doc) => {
        this.availableExercises.push({
          id: doc.id,
          name: doc.data()['name'],
          duration: doc.data()['duration'],
          caloriesBurn: doc.data()['caloriesBurn'],
        });
        itemsProcessed++;
        if (itemsProcessed === querySnapshots.size) {
          this.exercisesChanged.next([...this.availableExercises]);
          this.store.dispatch(fetchAvailableExercisesSuccessAction())
        }
      });
    }
  }

  startExercise(selectedId: string) {
    //You can update data with the code below, remember to add 'async' to the startExercise function
    //const availableExercisesRef = doc(this.firestore, 'availableExercises/' + selectedId);
    //await updateDoc( availableExercisesRef , {lastSelected: new Date()})
    this.store.dispatch(startNewExerciseAction());

    this.runningExercise = this.availableExercises.find(
      (ex) => ex.id === selectedId
    );
    this.exerciseChanged.next({ ...this.runningExercise });
  }

  completeExercise() {
    this.store.dispatch(finishCurrentExercise());
    this.addDataToDatabase({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed',
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.store.dispatch(stopCurrentExerciseAction());
    this.addDataToDatabase({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      caloriesBurn: this.runningExercise.caloriesBurn * (progress / 100),
      date: new Date(),
      state: 'cancelled',
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  fetchCompletedOrCancelledExercises() {
    const q = query(collection(this.firestore, 'finishedExercises'));
    onSnapshot(
      q,
      (snapshot) => {
        const exercises: ExerciseInterface[] = [];
        snapshot.forEach((doc: QueryDocumentSnapshot<ExerciseInterface>) => {
          exercises.push({
            ...doc.data(),
            date: new Date(doc.data().date['seconds'] * 1000),
          });
          this.finishedExercisesChanged.next(exercises);
        });
      },
      (onError) => {}
    );
  }

  private async addDataToDatabase(exercise: ExerciseInterface) {
    const docRef = await addDoc(
      collection(this.firestore, 'finishedExercises'),
      exercise
    );
  }
}
