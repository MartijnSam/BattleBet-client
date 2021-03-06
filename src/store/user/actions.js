import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage,
} from "../appState/actions";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const TOKEN_STILL_VALID = "TOKEN_STILL_VALID";
export const LOG_OUT = "LOG_OUT";

const loginSuccess = (userWithToken) => {
  return {
    type: LOGIN_SUCCESS,
    payload: userWithToken,
  };
};

const tokenStillValid = (userWithoutToken) => ({
  type: TOKEN_STILL_VALID,
  payload: userWithoutToken,
});

export const logOut = () => ({ type: LOG_OUT });

export const signUpDis = (user) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await user;
      dispatch(loginSuccess(response.data.signup));
      dispatch(showMessageWithTimeout("success", true, "account created"));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const loginDis = (user) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await user;
      dispatch(loginSuccess(response.data.login));
      dispatch(
        showMessageWithTimeout(
          "success",
          false,
          `Welcome back ${response.data.login.user.userName}`,
          1500
        )
      );
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const getUserWithStoredToken = (data, loading, error) => {
  return async (dispatch, getState) => {
    if (error) dispatch(setMessage("danger", true, error.message));
    if (!data) return;
    if (loading) dispatch(appLoading());
    if (error) console.log(error);
    const userdata = await data;
    try {
      dispatch(tokenStillValid(userdata.checkToken));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error);
        dispatch(setMessage("danger", true, error.message));
      }
      // if we get a 4xx or 5xx response,
      // get rid of the token by logging out
      dispatch(logOut());
      dispatch(appDoneLoading());
    }
  };
};
