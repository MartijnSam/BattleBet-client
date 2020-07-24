import React from "react";
import { Pane, Button, Text } from "evergreen-ui";
import { START_TOURNAMENT } from "../../../../store/tournaments/gql";
import { useMutation } from "@apollo/react-hooks";
import { startTournamentDis } from "../../../../store/tournaments/actions";
import { useDispatch } from "react-redux";
import { setMessage } from "../../../../store/appState/actions";

export default function AdminPanel(props) {
  const { id, started, playergroup } = props;
  const [startTournament] = useMutation(START_TOURNAMENT);
  const dispatch = useDispatch();

  async function handleStart() {
    try {
      let { loading, error, data } = await startTournament({
        variables: { TournamentId: id },
      });
      dispatch(startTournamentDis(loading, error, data));
    } catch (e) {
      dispatch(setMessage("danger", true, e.message));
    }
  }

  const renderAdminControls = (
    <Pane
      border
      marginTop={20}
      padding={20}
      display="flex"
      flexDirection="column"
    >
      <h5>Admin Controls</h5>
      <Button iconBefore="add" intent="success" margin="1rem" width={200}>
        Invite Players
      </Button>
      {started ? null : (
        <>
          <Text>You need 8 players to start the tournament.</Text>
          <Text>Currently {playergroup.length} players.</Text>
          <Button
            onClick={() => {
              handleStart();
            }}
            iconBefore="build"
            intent="success"
            margin="1rem"
            width={200}
          >
            Start Tournament
          </Button>
        </>
      )}
      <Button iconBefore="trash" intent="danger" margin="1rem" width={200}>
        Delete Tournament
      </Button>
    </Pane>
  );

  return (
    <Pane display="flex" flexDirection="column">
      {renderAdminControls}
    </Pane>
  );
}
