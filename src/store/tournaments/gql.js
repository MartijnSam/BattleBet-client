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
      League {
        id
        name
        Teams {
          id
          name
          logo
        }
        Fixtures {
          id
          date
          HTScoreTeam1
          HTScoreTeam2
          FTScoreTeam1
          FTScoreTeam2
          status
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
          winnerTeam {
            id
            name
            logo
          }
        }
      }
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

export const GET_LEAGUES = gql`
  query {
    leagues {
      name
      id
    }
  }
`;

export const CREATE_TOURNAMENT = gql`
  mutation createTournament($name: String!, $LeagueId: Int!) {
    createTournament(name: $name, LeagueId: $LeagueId) {
      name
      id
      createdAt
      League {
        id
        name
        Teams {
          id
          name
          logo
        }
        Fixtures {
          id
          date
          HTScoreTeam1
          HTScoreTeam2
          FTScoreTeam1
          FTScoreTeam2
          status
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
          winnerTeam {
            id
            name
            logo
          }
        }
      }
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
