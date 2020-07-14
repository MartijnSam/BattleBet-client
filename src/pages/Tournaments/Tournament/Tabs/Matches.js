import React from "react";
import { Pane } from "evergreen-ui";
import MatchListItem from "./matchList/MatchListItem";

export default function Matches(props) {
  const { rounds } = props;
  // console.log(rounds);

  return (
    <Pane display="flex" flexDirection="column">
      {rounds.map((round) => (
        <Pane
          key={round.id}
          elevation={2}
          background="tint2"
          marginY={10}
          paddingTop={10}
          paddingBottom={10}
          display="flex"
          flexDirection="column"
        >
          {round.type}
          {round.Matches.map((match) => {
            return <MatchListItem key={match.id} match={match} />;
          })}
        </Pane>
      ))}
    </Pane>
  );
}
