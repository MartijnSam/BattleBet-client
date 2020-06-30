import gql from "graphql-tag";

export const GET_TOURNAMENTS = gql`
  query GET_TOURNAMENTS {
    tournaments {
      name
      id
      createdAt
      User {
        name
      }
    }
  }
`;
