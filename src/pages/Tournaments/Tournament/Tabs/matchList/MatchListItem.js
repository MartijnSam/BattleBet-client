import React from "react";
import { useSelector } from "react-redux";
import { findFixtureById } from "../../../../../store/tournaments/selectors";
import { Pane, Avatar, Heading, Text, Strong, Image } from "evergreen-ui";
import { formatDate } from "../../../../../config/constants";

export default function MatchListItem(props) {
  const { match } = props;
  const fixture = useSelector(findFixtureById(match.FixtureId));

  console.log(fixture);
  return (
    <Pane
      border
      display="flex"
      flexDirection="column"
      margin={20}
      elevation={3}
      padding={20}
    >
      <Pane border display="flex" flexDirection="row" justifyContent="left">
        <Pane
          display="flex"
          flexDirection="column"
          width="20%"
          justifyContent="center"
          alignItems="center"
        >
          <Avatar size={150} src={match.player1User.avatar} />
          <Heading size={700}>{match.player1User.userName}</Heading>
        </Pane>{" "}
        <Pane
          display="flex"
          flexDirection="column"
          width="60%"
          justifyContent="space-between"
          alignItems="center"
        >
          {" "}
          <Text>{formatDate(match.date)} </Text>
          <Pane display="flex" flexDirection="column">
            <Heading size={900}>
              {match.scorePlayer1 === null ? 0 : match.scorePlayer1} -{" "}
              {match.scorePlayer2 === null ? 0 : match.scorePlayer2}
            </Heading>
          </Pane>
          <Pane
            border
            marginTop={20}
            display="flex"
            flexDirection="row"
            justifyContent="space-evenly"
            width="70%"
          >
            <Pane
              display="flex"
              flexDirection="column"
              width="40%"
              justifyContent="center"
              alignItems="center"
            >
              <Pane>
                <Image height="2rem" src={fixture.homeTeam.logo} />
              </Pane>
              <Strong>{fixture.homeTeam.name}</Strong>
            </Pane>
            <Pane
              display="flex"
              flexDirection="column"
              width="20%"
              alignItems="center"
              justifyContent="center"
            >
              <Pane display="flex" flexDirection="column">
                <Strong>
                  {fixture.FTScoreTeam1 === null ? 0 : fixture.FTScoreTeam1} -{" "}
                  {fixture.FTScoreTeam2 === null ? 0 : fixture.FTScoreTeam2}
                </Strong>
              </Pane>
            </Pane>
            <Pane
              display="flex"
              flexDirection="column"
              width="40%"
              justifyContent="center"
              alignItems="center"
            >
              <Pane>
                <Image height="2rem" src={fixture.awayTeam.logo} />
              </Pane>
              <Strong>{fixture.awayTeam.name}</Strong>
            </Pane>
          </Pane>
        </Pane>
        <Pane
          display="flex"
          flexDirection="column"
          width="20%"
          justifyContent="center"
          alignItems="center"
        >
          <Avatar size={150} src={match.player2User.avatar} />
          <Heading size={700}>{match.player2User.userName}</Heading>
        </Pane>
      </Pane>
      <Pane
        border
        display="flex"
        flexDirection="row"
        justifyContent="left"
      ></Pane>
    </Pane>
  );
}
