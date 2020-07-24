import React from "react";
import { Pane } from "evergreen-ui";

export default function LeagueHome(props) {
  const { name } = props;
  return (
    <Pane border padding={20} display="flex" flexDirection="column">
      <h4>{name}</h4>
    </Pane>
  );
}
