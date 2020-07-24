import React from "react";
import { Pane, Heading, Image, Strong } from "evergreen-ui";

export default function Prediction(props) {
  const { prediction, Fixture } = props;
  return (
    <Pane
      border
      marginTop={20}
      display="flex"
      flexDirection="row"
      justifyContent="space-evenly"
      width="100%"
    >
      <Pane
        display="flex"
        flexDirection="column"
        width="40%"
        justifyContent="center"
        alignItems="center"
      >
        <Pane>
          <Image height="2rem" src={Fixture.homeTeam.logo} />
        </Pane>
        <Strong>{Fixture.homeTeam.name}</Strong>
        <Pane
          background={
            parseInt(Fixture.homeTeam.id) === parseInt(prediction.winner)
              ? "#C6F91F"
              : "#F8403A"
          }
          height={5}
          width="100%"
        ></Pane>
      </Pane>
      <Pane
        display="flex"
        flexDirection="column"
        width="50%"
        alignItems="center"
        justifyContent="center"
      >
        <Pane display="flex" flexDirection="column" alignItems="center">
          <Heading size={400}>Half Time Score</Heading>
          <Strong>
            {prediction.HTScoreTeam1} - {prediction.HTScoreTeam2}
          </Strong>
          <Heading size={400}>Full Time Score</Heading>
          <Strong>
            {prediction.FTScoreTeam1} - {prediction.FTScoreTeam2}
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
          <Image height="2rem" src={Fixture.awayTeam.logo} />
        </Pane>
        <Strong>{Fixture.awayTeam.name}</Strong>
        <Pane
          background={
            parseInt(Fixture.awayTeam.id) === parseInt(prediction.winner)
              ? "#C6F91F"
              : "#F8403A"
          }
          height={5}
          width="100%"
        ></Pane>
      </Pane>
    </Pane>
  );
}
