import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ExerciseStateInterface } from "./types/ExerciseState.interface";

export const appFeatureSelector = createFeatureSelector<ExerciseStateInterface>('training');

export const isTraining = createSelector(
  appFeatureSelector,
  (state: ExerciseStateInterface) => state.isTraining
);