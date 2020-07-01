export const selectTournamentAdmin = (state) =>
  state.tournaments.tournament.User;

export const checkUserInTournament = (state) => {
  return state.tournaments.tournament.PlayerGroup.Users.map(
    (plyr) => plyr.id
  ).includes(state.user.id);
};
export const checkUserTournamentAdmin = (state) => {
  return state.tournaments.tournament.User.id === state.user.id;
};
