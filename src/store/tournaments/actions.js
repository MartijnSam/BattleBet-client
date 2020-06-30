import { appDoneLoading } from "../appState/actions";

export const TOURNAMENTS_LOADED = "TOURNAMENTS_LOADED";

const tournamentsLoaded = (tournaments) => {
  return { type: TOURNAMENTS_LOADED, payload: tournaments };
};

export const gotTournaments = (data) => {
  return async (dispatch, getState) => {
    dispatch(appDoneLoading());
    dispatch(tournamentsLoaded(data.tournaments));
  };
};
