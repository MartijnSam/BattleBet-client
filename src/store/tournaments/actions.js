import {
  appDoneLoading,
  appLoading,
  setMessage,
  showMessageWithTimeout,
} from "../appState/actions";

export const TOURNAMENTS_LOADED = "TOURNAMENTS_LOADED";
export const TOURNAMENT_LOADED = "TOURNAMENT_LOADED";

const tournamentsLoaded = (tournaments) => {
  return { type: TOURNAMENTS_LOADED, payload: tournaments };
};
const tournamentLoaded = (tournament) => {
  return { type: TOURNAMENT_LOADED, payload: tournament };
};

export const gotTournaments = (data) => {
  return async (dispatch, getState) => {
    dispatch(appDoneLoading());
    dispatch(tournamentsLoaded(data.tournaments));
  };
};

export const gotTournament = (data) => {
  return (dispatch, getState) => {
    dispatch(appDoneLoading());
    dispatch(tournamentLoaded(data.tournament));
  };
};

export const joinTournamentDis = (loading, error, data) => {
  return (dispatch, getState) => {
    if (loading) dispatch(appLoading());
    if (error) dispatch(setMessage("danger", true, error.message));
    if (data) {
      dispatch(appDoneLoading());
      dispatch(
        showMessageWithTimeout(
          "success",
          false,
          `You've succesfully joined tournament ${data.joinTournament.name}`
        )
      );
      dispatch(tournamentLoaded(data.joinTournament));
    }
  };
};

export const startTournamentDis = (loading, error, data) => {
  return (dispatch, getState) => {
    if (loading) dispatch(appLoading());
    if (error) dispatch(setMessage("danger", true, error.message));
    if (data) {
      dispatch(appDoneLoading());
      dispatch(
        showMessageWithTimeout(
          "success",
          false,
          `You've succesfully started tournament ${data.startTournament.name}`
        )
      );
      dispatch(tournamentLoaded(data.startTournament));
    }
  };
};

export const createdTournament = (data) => {
  return (dispatch, getState) => {
    dispatch(appDoneLoading());
    dispatch(
      showMessageWithTimeout(
        "success",
        false,
        `You've succesfully created tournament ${data.createTournament.name}`
      )
    );
    dispatch(tournamentLoaded(data.createTournament));
  };
};
