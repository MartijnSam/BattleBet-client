import React from "react";
import { Pane, Avatar, Button } from "evergreen-ui";
import { formatDate } from "../../../../config/constants";
import { selectUser } from "../../../../store/user/selectors";
import { useSelector, useDispatch } from "react-redux";
import { joinTournamentDis } from "../../../../store/tournaments/actions";
import { JOIN_TOURNAMENT } from "../../../../store/tournaments/gql";
import { useMutation } from "@apollo/react-hooks";
import { setMessage } from "../../../../store/appState/actions";

export default function TournamentHome(props) {
  const { admin, createdAt, playergroup, id } = props;
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [joinTournament] = useMutation(JOIN_TOURNAMENT);

  const renderDeleteButton =
    user.id !== admin.id ? null : (
      <Pane>
        <Button iconBefore="trash" marginTop="2rem">
          Delete Tournament
        </Button>
      </Pane>
    );

  const renderJoinButton = playergroup
    .map((pyr) => pyr.id)
    .includes(user.id) ? null : (
    <Pane marginTop="2rem">
      <Button
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
      <Pane border marginBottom="2rem">
        Tournament Admin
        <Pane display="flex" flexDirection="row">
          <Avatar src={admin.avatar} marginRight="1rem" marginLeft="1rem" />
          {admin.userName}
        </Pane>
      </Pane>
      <Pane>Created on: {formatDate(createdAt)}</Pane>
      {renderJoinButton}
      {renderDeleteButton}
    </Pane>
  );
}
