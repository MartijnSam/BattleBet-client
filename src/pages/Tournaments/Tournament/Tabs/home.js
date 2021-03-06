import React from "react";
import { Pane, Avatar, Button, Text } from "evergreen-ui";
import { formatDate } from "../../../../config/constants";
import { selectUser } from "../../../../store/user/selectors";
import { useSelector, useDispatch } from "react-redux";
import { joinTournamentDis } from "../../../../store/tournaments/actions";
import { JOIN_TOURNAMENT } from "../../../../store/tournaments/gql";
import { useMutation } from "@apollo/react-hooks";
import { setMessage } from "../../../../store/appState/actions";

export default function TournamentHome(props) {
  const { admin, createdAt, playergroup, id, league, started } = props;
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [joinTournament] = useMutation(JOIN_TOURNAMENT);

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

      {started ? null : renderJoinButton}
    </Pane>
  );
}
