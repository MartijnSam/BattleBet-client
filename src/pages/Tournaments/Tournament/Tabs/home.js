import React from "react";
import { Pane, Avatar, Button, Text } from "evergreen-ui";
import { formatDate } from "../../../../config/constants";
import { selectUser } from "../../../../store/user/selectors";
import { useSelector, useDispatch } from "react-redux";
import {
  joinTournamentDis,
  startTournamentDis,
} from "../../../../store/tournaments/actions";
import {
  JOIN_TOURNAMENT,
  START_TOURNAMENT,
} from "../../../../store/tournaments/gql";
import { useMutation } from "@apollo/react-hooks";
import { setMessage } from "../../../../store/appState/actions";

export default function TournamentHome(props) {
  const { admin, createdAt, playergroup, id, league, started } = props;
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [joinTournament] = useMutation(JOIN_TOURNAMENT);
  const [startTournament] = useMutation(START_TOURNAMENT);

  const renderAdminControls =
    user.id !== admin.id ? null : (
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

  const renderJoinButton = playergroup
    .map((pyr) => pyr.id)
    .includes(user.id) ? null : (
    <Pane border marginTop={20} padding={20}>
      <Button
        iconBefore="add"
        intent="success"
        onClick={() => {
          handleJoin();
        }}
      >
        Join Tournament
      </Button>
    </Pane>
  );

  async function handleJoin() {
    try {
      let { loading, error, data } = await joinTournament({
        variables: { TournamentId: id },
      });
      dispatch(joinTournamentDis(loading, error, data));
    } catch (e) {
      dispatch(setMessage("danger", true, e.message));
    }
  }

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

  return (
    <Pane display="flex" flexDirection="column">
      <Pane
        border
        marginBottom="2rem"
        padding={20}
        display="flex"
        flexDirection="column"
      >
        <Text>Tournament League: {league.name}</Text>
        <Text>Created on: {formatDate(createdAt)}</Text>
      </Pane>
      <Pane border marginBottom="2rem" padding={20}>
        Tournament Admin
        <Pane display="flex" flexDirection="row" margin={10}>
          <Avatar src={admin.avatar} marginRight="1rem" marginLeft="1rem" />
          {admin.userName}
        </Pane>
      </Pane>

      {renderJoinButton}
      {renderAdminControls}
    </Pane>
  );
}
