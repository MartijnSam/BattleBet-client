import React from "react";
import { Pane, Avatar } from "evergreen-ui";

export default function Teams(props) {
  const { teams } = props;
  const renderTeamsList = teams.map((team) => {
    return (
      <Pane
        elevation={2}
        background="tint2"
        marginY={10}
        paddingTop={10}
        paddingBottom={10}
        display="flex"
        flexDirection="row"
        key={team.id}
      >
        <Avatar src={team.logo} marginRight="1rem" marginLeft="1rem" />
        {team.name}
      </Pane>
    );
  });
  return (
    <Pane display="flex" flexDirection="column" border padding={20}>
      {renderTeamsList}
    </Pane>
  );
}
