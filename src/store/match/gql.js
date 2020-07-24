import gql from "graphql-tag";

export const GET_MATCH = gql`
  query GET_MATCH($id: ID!) {
    match(id: $id) {
      id
      player1User {
        id
        userName
        avatar
      }
      player2User {
        id
        userName
        avatar
      }
      winnerUser {
        id
        userName
        avatar
      }
      scorePlayer1
      scorePlayer2
      date
      predictionPlayer1 {
        id
        UserId
        HTScoreTeam1
        HTScoreTeam2
        FTScoreTeam1
        FTScoreTeam2
        winner
      }
      predictionPlayer2 {
        id
        UserId
        HTScoreTeam1
        HTScoreTeam2
        FTScoreTeam1
        FTScoreTeam2
        winner
      }
      Fixture {
        id
        homeTeam {
          id
          name
          logo
        }
        awayTeam {
          id
          name
          logo
        }
        status
        HTScoreTeam1
        HTScoreTeam2
        FTScoreTeam1
        FTScoreTeam2
        winnerTeam {
          id
          name
          logo
        }
      }
    }
  }
`;

export const CREATE_PREDICTION = gql`
  mutation CREATE_PREDICTION(
    $MatchId: Int!
    $HTScoreTeam1: Int!
    $HTScoreTeam2: Int!
    $FTScoreTeam1: Int!
    $FTScoreTeam2: Int!
    $winner: Int!
  ) {
    createPrediction(
      MatchId: $MatchId
      HTScoreTeam1: $HTScoreTeam1
      HTScoreTeam2: $HTScoreTeam2
      FTScoreTeam1: $FTScoreTeam1
      FTScoreTeam2: $FTScoreTeam2
      winner: $winner
    ) {
      id
    }
  }
`;

export const CALC_RESULTS = gql`
  mutation CALC_RESULTS($id: Int!) {
    calculateResults(id: $id) {
      id
    }
  }
`;
