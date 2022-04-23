import { createAction } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';

export const fetchAvailableExercisesAction = createAction(
  ActionTypes.FETCH_AVAILABLE_EXERCISES
);

export const fetchAvailableExercisesSuccessAction = createAction(
  ActionTypes.FETCH_AVAILABLE_EXERCISES_SUCCESS
);

export const fetchAvailableExercisesFailureAction = createAction(
  ActionTypes.FETCH_AVAILABLE_EXERCISES_FAILURE
);
