import { Action, createReducer, on } from '@ngrx/store';
import { finishCurrentExercise, startNewExerciseAction, stopCurrentExerciseAction } from './actions/startNewExercise.action';
import { ExerciseStateInterface } from './types/ExerciseState.interface';

const initialState: ExerciseStateInterface = {
  isTraining: false,
};

const TrainingReducer = createReducer(
  initialState,
  on(
    startNewExerciseAction,
    (state): ExerciseStateInterface => ({
      ...state,
      isTraining: true,
    })
  ),
  on(
    stopCurrentExerciseAction,
    (state): ExerciseStateInterface => ({
      ...state,
      isTraining: false,
    })
  ),
  on(
    finishCurrentExercise,
    (state): ExerciseStateInterface => ({
      ...state,
      isTraining: false,
    })
  ),
);

export function trainingReducers(state: ExerciseStateInterface, action: Action) {
  return TrainingReducer(state, action);
}
