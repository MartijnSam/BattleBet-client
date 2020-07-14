import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { MY_TOURNAMENTS } from "../../store/tournaments/gql";
import Loading from "../../components/Loading";
import TournamentTable from "../../components/Tournament/TournamentTable";
import { Pane } from "evergreen-ui";
import { setMessage } from "../../store/appState/actions";
import { useDispatch } from "react-redux";

export default function MyTournaments() {
  const dispatch = useDispatch();
  const { loading, error, data } = useQuery(MY_TOURNAMENTS);

  if (loading) {
    return <Loading />;
  }

  if (error) dispatch(setMessage("danger", true, error.message));

  console.log(data);
  const renderAdminTournaments = (
    <TournamentTable data={data.myTournaments.adminTournaments} />
  );
  const renderPlayerTournaments = (
    <TournamentTable data={data.myTournaments.playerTournaments} />
  );

  return (
    <Pane border marginTop="2rem" width="100%">
      <Pane border padding={20}>
        <h1>Tournaments you've created</h1>
      </Pane>
      {renderAdminTournaments}
      <Pane border padding={20}>
        <h1>Tournaments you're in</h1>
      </Pane>
      {renderPlayerTournaments}
    </Pane>
  );
}
