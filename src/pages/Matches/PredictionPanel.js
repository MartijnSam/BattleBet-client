import React, { useState } from "react";
import {
  Button,
  Pane,
  Image,
  Strong,
  Heading,
  Dialog,
  TickCircleIcon,
  Select,
} from "evergreen-ui";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_PREDICTION } from "../../store/match/gql";
import { useDispatch } from "react-redux";
import { setMessage } from "../../store/appState/actions";
import Prediction from "./Prediction";

export default function PredictionPanel(props) {
  const { user, match, Fixture, prediction1, prediction2 } = props;
  const [createPrediction] = useMutation(CREATE_PREDICTION);
  const dispatch = useDispatch();

  const [winner, setWinner] = useState(false);
  const [HTScoreTeam1, setHTScoreTeam1] = useState(0);
  const [HTScoreTeam2, setHTScoreTeam2] = useState(0);
  const [FTScoreTeam1, setFTScoreTeam1] = useState(0);
  const [FTScoreTeam2, setFTScoreTeam2] = useState(0);
  const [showSucces, setShowSucces] = useState(false);

  if (
    prediction1 !== null &&
    parseInt(prediction1.UserId) === parseInt(user.id)
  )
    return (
      <Pane border marginTop="2rem" width="60%">
        <Heading>You have made a prediction in this match</Heading>
        <Prediction Fixture={Fixture} prediction={prediction1} />{" "}
      </Pane>
    );

  if (
    prediction2 !== null &&
    parseInt(prediction2.UserId) === parseInt(user.id)
  )
    return (
      <Pane border marginTop="2rem" width="60%">
        <Heading>You already have made a prediction for this match</Heading>
        <Prediction Fixture={Fixture} prediction={prediction2} />{" "}
      </Pane>
    );

  async function handleSubmit() {
    try {
      let data = await createPrediction({
        variables: {
          MatchId: parseInt(match.id),
          HTScoreTeam1: parseInt(HTScoreTeam1),
          HTScoreTeam2: parseInt(HTScoreTeam2),
          FTScoreTeam1: parseInt(FTScoreTeam1),
          FTScoreTeam2: parseInt(FTScoreTeam2),
          winner: parseInt(winner),
        },
      });
      if (data) setShowSucces(true);
    } catch (e) {
      dispatch(setMessage("danger", true, e.message));
    }
  }

  return (
    <>
      <Pane border marginTop="2rem" width="100%">
        <Pane border padding={20}>
          <Heading size={700}>Make your prediction</Heading>
          <Pane
            border
            marginTop={20}
            display="flex"
            flexDirection="row"
            justifyContent="space-evenly"
            width="60%"
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
                  winner
                    ? parseInt(Fixture.homeTeam.id) === parseInt(winner)
                      ? "#C6F91F"
                      : "#F8403A"
                    : null
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
                  <input
                    type="number"
                    value={HTScoreTeam1}
                    onChange={(e) => setHTScoreTeam1(e.target.value)}
                  ></input>
                  -
                  <input
                    type="number"
                    value={HTScoreTeam2}
                    onChange={(e) => setHTScoreTeam2(e.target.value)}
                  ></input>
                </Strong>
                <Heading size={400}>Full Time Score</Heading>
                <Strong>
                  <input
                    type="number"
                    value={FTScoreTeam1}
                    onChange={(e) => setFTScoreTeam1(e.target.value)}
                  ></input>
                  -
                  <input
                    type="number"
                    value={FTScoreTeam2}
                    onChange={(e) => setFTScoreTeam2(e.target.value)}
                  ></input>
                </Strong>
                <Pane display="flex" flexDirection="row" alignItems="center">
                  <Heading size={400}>Winner: </Heading>
                  <Select
                    value={winner}
                    onChange={(e) => setWinner(e.target.value)}
                  >
                    <option value={Fixture.homeTeam.id}>
                      {Fixture.homeTeam.name}
                    </option>
                    <option value={Fixture.awayTeam.id}>
                      {Fixture.awayTeam.name}
                    </option>
                  </Select>
                </Pane>

                <Button
                  intent="success"
                  iconBefore="add"
                  onClick={() => handleSubmit()}
                >
                  Predict!
                </Button>
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
                  winner
                    ? parseInt(Fixture.awayTeam.id) === parseInt(winner)
                      ? "#C6F91F"
                      : "#F8403A"
                    : null
                }
                height={5}
                width="100%"
              ></Pane>
            </Pane>
          </Pane>
        </Pane>
      </Pane>
      <Dialog
        isShown={showSucces}
        title="YEEY!"
        onCloseComplete={() => {
          setShowSucces(false);
          window.location.reload(false);
        }}
        hasClose={false}
        hasCancel={false}
        intent="success"
      >
        <TickCircleIcon color="success" marginRight={16} />
        You've successfully submitted your prediction!
      </Dialog>
    </>
  );
}
