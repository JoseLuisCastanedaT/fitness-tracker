import { Action, createReducer, on } from '@ngrx/store';
import { fetchAvailableExercisesAction, fetchAvailableExercisesFailureAction, fetchAvailableExercisesSuccessAction } from './actions/fetchAvailableExercises.action';
import { loginAction, loginFailureAction, loginSuccessAction } from './actions/login.action';
import { logoutAction } from './actions/logout.action';
import { signupAction, signupFailureAction, signupSuccessAction } from './actions/signup.action';
import { AppStateInterface } from './types/appState.interface';

const initialState: AppStateInterface = {
  isLoading: false,
  isAuthenticated: false
};

const AppReducer = createReducer(
  initialState,
  on(
    signupAction,
    (state): AppStateInterface => ({
      ...state,
      isLoading: true
    })
  ),
  on(
    signupSuccessAction,
    (state): AppStateInterface => ({
      ...state,
      isLoading: false,
      isAuthenticated: true
    })
  ),
  on(
    signupFailureAction,
    (state): AppStateInterface => ({
      ...state,
      isLoading: false,
    })
  ),
  on(
    loginAction,
    (state): AppStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    loginSuccessAction,
    (state): AppStateInterface => ({
      ...state,
      isLoading: false,
      isAuthenticated: true
    })
  ),
  on(
    loginFailureAction,
    (state): AppStateInterface => ({
      ...state,
      isLoading: false
    })
  ),
  on(
    fetchAvailableExercisesAction,
    (state): AppStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    fetchAvailableExercisesSuccessAction,
    (state): AppStateInterface => ({
      ...state,
      isLoading: false,
    })
  ),
  on(
    fetchAvailableExercisesFailureAction,
    (state): AppStateInterface => ({
      ...state,
      isLoading: false,
    })
  ),
  on(
    logoutAction,
    (state): AppStateInterface => ({
      ...state,
      isLoading: false,
      isAuthenticated: false,
    })
  ),
);

export function reducers(state: AppStateInterface, action: Action) {
  return AppReducer(state, action);
}
