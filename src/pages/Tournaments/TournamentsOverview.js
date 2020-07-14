import React from "react";
import { Pane } from "evergreen-ui";
import { useQuery } from "@apollo/react-hooks";
import { useDispatch } from "react-redux";
import { GET_TOURNAMENTS } from "./../../store/tournaments/gql";
import { gotTournaments } from "./../../store/tournaments/actions";
import { setMessage } from "../../store/appState/actions";
import Loading from "../../components/Loading";
import TournamentTable from "../../components/Tournament/TournamentTable";

export default function TournamentsOverview() {
  const dispatch = useDispatch();
  const { loading, error, data } = useQuery(GET_TOURNAMENTS);
  if (loading) {
    return <Loading />;
  }
  if (error) dispatch(setMessage("danger", true, error.message));
  if (data) dispatch(gotTournaments(data));

  const renderTournamentsTable = <TournamentTable data={data.tournaments} />;

  return (
    <Pane border marginTop="2rem" width="100%">
      <Pane border padding={20}>
        <h1>Tournaments</h1>
      </Pane>
      {renderTournamentsTable}
    </Pane>
  );
}
