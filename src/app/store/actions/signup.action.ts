import { createAction, props } from "@ngrx/store";
import { ActionTypes } from "../actionTypes";

export const signupAction = createAction(
    ActionTypes.SIGNUP,
    //props<{request: AuthDataInterface}>()
)

export const signupSuccessAction = createAction(
    ActionTypes.SIGNUP_SUCCESS
)

export const signupFailureAction = createAction(
    ActionTypes.SIGNUP_FAILURE
)
  