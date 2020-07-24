import { TOURNAMENTS_LOADED, TOURNAMENT_LOADED } from "./actions";

const initialState = {
  tournaments: [],
  tournament: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOURNAMENTS_LOADED:
      return { tournaments: action.payload };
    case TOURNAMENT_LOADED:
      return { ...state, tournament: action.payload };
    default:
      return state;
  }
};
