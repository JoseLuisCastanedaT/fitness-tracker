import { createAction } from "@ngrx/store";
import { ActionTypes } from "../actionTypes";

export const loginAction = createAction(
    ActionTypes.LOGIN
  );
  
  export const loginSuccessAction = createAction(
    ActionTypes.LOGIN_SUCCESS
  );
  
  export const loginFailureAction = createAction(
    ActionTypes.LOGIN_FAILURE,
  );
  