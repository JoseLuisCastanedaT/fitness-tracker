import { createAction } from "@ngrx/store";
import { ActionTypes } from "src/app/training/store/actionTypes";

export const startNewExerciseAction = createAction(
    ActionTypes.START_NEW_EXERCISE
  );
  
  export const stopCurrentExerciseAction = createAction(
    ActionTypes.STOP_CURRENT_EXERCISE
  );
  
  export const finishCurrentExercise = createAction(
    ActionTypes.FINISH_CURRENT_EXERCISE
  );