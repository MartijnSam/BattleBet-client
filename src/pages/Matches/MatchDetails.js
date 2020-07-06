import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_MATCH, CALC_RESULTS } from "../../store/match/gql";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../../store/appState/actions";
import { Pane, Avatar, Heading, Text, Strong, Image } from "evergreen-ui";
import { formatDate } from "../../config/constants";
import { selectUser } from "../../store/user/selectors";
import PredictionPanel from "./PredictionPanel";
import Prediction from "./Prediction";

export default function MatchDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [createResults] = useMutation(CALC_RESULTS);
  const { loading, error, data } = useQuery(GET_MATCH, {
    variables: { id: parseInt(id) },
  });
  if (loading) {
    return <Loading />;
  }
  if (error) {
    dispatch(setMessage("danger", true, error.message));
    return <Loading />;
  }

  const { match } = data;
  const { Fixture } = match;
  console.log(match);

  // async function getResults() {
  //   try {
  //     let data = await createResults({ variables: { id: parseInt(id) } });
  //     console.log(data);
  //   } catch (e) {
  //     dispatch(setMessage("danger", true, e.message));
  //   }
  // }

  // if (Fixture.status === "Finished" && match.winnerUser === null) {
  //   getResults();
  // }

  function renderPrediction(prediction) {
    return <Prediction prediction={prediction} Fixture={Fixture} />;
  }

  function renderPlayerContent() {
    if (match.player1User.id !== user.id && match.player2User.id !== user.id)
      return null;
    if (Fixture.status !== "Upcoming")
      return (
        <Pane border marginTop={30} padding={20}>
          <Heading size={700}>Player Panel</Heading>
          <Text>
            The match has started! You cannot make predictions anymore...
          </Text>
        </Pane>
      );
    else
      return (
        <Pane border marginTop={30} padding={20}>
          <Heading size={700}>Player Panel</Heading>
          <Text>Make your predictions here!</Text>
          <PredictionPanel
            match={match}
            user={user}
            Fixture={Fixture}
            prediction1={match.predictionPlayer1}
            prediction2={match.predictionPlayer2}
          />
        </Pane>
      );
  }

  function renderPredictionContent() {
    if (Fixture.status === "Upcoming") {
      return (
        <Pane
          border
          display="flex"
          flexDirection="row"
          justifyContent="left"
          marginTop={20}
          width="80%"
          padding={20}
        >
          <Text>
            The players are making their predictions, you can view them here
            after the match is finished or view them live!
          </Text>
        </Pane>
      );
    } else
      return (
        <Pane
          border
          display="flex"
          flexDirection="row"
          justifyContent="left"
          marginTop={20}
          width="80%"
          padding="20"
        >
          <Pane
            display="flex"
            flexDirection="column"
            width="50%"
            justifyContent="center"
            alignItems="center"
          >
            <Heading size={800}>
              Predictions of {match.player1User.userName}
            </Heading>
            {match.predictionPlayer1 === null ? (
              <Text>
                {match.player1User.userName} has not made any predictions
              </Text>
            ) : (
              renderPrediction(match.predictionPlayer1)
            )}{" "}
          </Pane>
          <Pane
            display="flex"
            flexDirection="column"
            width="50%"
            justifyContent="center"
            alignItems="center"
          >
            <Heading size={800}>
              Predictions of {match.player2User.userName}
            </Heading>
            {match.predictionPlayer2 === null ? (
              <Text>
                {match.player2User.userName} has not made any predictions
              </Text>
            ) : (
              renderPrediction(match.predictionPlayer2)
            )}{" "}
          </Pane>
        </Pane>
      );
  }

  return (
    <Pane border marginTop="2rem" width="100%" marginLeft="5rem">
      <Pane border padding={20}>
        <Heading size={900}>Match</Heading>
        <Heading size={600}>Status: {Fixture.status}</Heading>
      </Pane>
      <Pane
        border
        display="flex"
        flexDirection="row"
        justifyContent="left"
        width="80%"
      >
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
                <Image height="2rem" src={Fixture.homeTeam.logo} />
              </Pane>
              <Strong>{Fixture.homeTeam.name}</Strong>
              <Pane
                height={5}
                background={
                  Fixture.status === "Finished"
                    ? parseInt(Fixture.homeTeam.id) ==
                      parseInt(Fixture.winnerTeam.id)
                      ? "#C6F91F"
                      : "#F8403A"
                    : null
                }
                width="100%"
              ></Pane>
            </Pane>
            <Pane
              display="flex"
              flexDirection="column"
              width="20%"
              alignItems="center"
              justifyContent="center"
            >
              <Pane display="flex" flexDirection="column" alignItems="center">
                Half-Time
                <Strong>
                  {Fixture.HTScoreTeam1 === null ? 0 : Fixture.HTScoreTeam1} -{" "}
                  {Fixture.HTScoreTeam2 === null ? 0 : Fixture.HTScoreTeam2}
                </Strong>
                Full-Time
                <Strong>
                  {Fixture.FTScoreTeam1 === null ? 0 : Fixture.FTScoreTeam1} -{" "}
                  {Fixture.FTScoreTeam2 === null ? 0 : Fixture.FTScoreTeam2}
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
                height={5}
                background={
                  Fixture.status === "Finished"
                    ? parseInt(Fixture.awayTeam.id) ==
                      parseInt(Fixture.winnerTeam.id)
                      ? "#C6F91F"
                      : "#F8403A"
                    : null
                }
                width="100%"
              ></Pane>
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
      {renderPredictionContent()}
      {renderPlayerContent()}
    </Pane>
  );
}
