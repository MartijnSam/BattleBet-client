import { DEFAULT_MESSAGE_TIMEOUT } from "../../config/constants";

export const APP_LOADING = "APP_LOADING";
export const APP_DONE_LOADING = "APP_DONE_LOADING";
export const SET_MESSAGE = "SET_MESSAGE";
export const CLEAR_MESSAGE = "CLEAR_MESSAGE";

export const appLoading = () => ({ type: APP_LOADING });
export const appDoneLoading = () => ({ type: APP_DONE_LOADING });
export const clearMessage = () => ({ type: CLEAR_MESSAGE });

export const setMessage = (intent, removeable, text, title) => {
  return {
    type: SET_MESSAGE,
    payload: {
      intent,
      removeable,
      text,
      title,
    },
  };
};

export const showMessageWithTimeout = (
  intent,
  removeable,
  text,
  timeOutMilliSeconds,
  title
) => {
  return (dispatch) => {
    dispatch(setMessage(intent, removeable, text, title));

    const timeout = timeOutMilliSeconds || DEFAULT_MESSAGE_TIMEOUT;

    setTimeout(() => dispatch(clearMessage()), timeout);
  };
};
