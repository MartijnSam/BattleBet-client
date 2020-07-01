import gql from "graphql-tag";

export const GET_TOURNAMENTS = gql`
  query GET_TOURNAMENTS {
    tournaments {
      name
      id
      createdAt
      User {
        id
        userName
        avatar
      }
      PlayerGroup {
        id
        Users {
          id
          userName
          avatar
        }
      }
    }
  }
`;

export const GET_TOURNAMENT = gql`
  query GetOneTournament($TournamentId: ID!) {
    tournament(TournamentId: $TournamentId) {
      name
      id
      createdAt
      User {
        id
        userName
        avatar
      }
      PlayerGroup {
        id
        Users {
          id
          userName
          avatar
        }
      }
    }
  }
`;

export const JOIN_TOURNAMENT = gql`
  mutation JoinTournament($TournamentId: ID!) {
    joinTournament(TournamentId: $TournamentId) {
      name
      id
      createdAt
      User {
        id
        userName
        avatar
      }
      PlayerGroup {
        id
        Users {
          id
          userName
          avatar
        }
      }
    }
  }
`;
