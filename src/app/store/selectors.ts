import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppStateInterface } from './types/appState.interface';

export const appFeatureSelector = createFeatureSelector<AppStateInterface>('ui');

export const isLoadingSelector = createSelector(
  appFeatureSelector,
  (state: AppStateInterface) => state.isLoading
);

export const isAuthenticatedSelector = createSelector(
  appFeatureSelector,
  (state: AppStateInterface) => state.isAuthenticated
);