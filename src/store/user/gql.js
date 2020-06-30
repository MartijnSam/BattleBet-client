import gql from "graphql-tag";

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

export const CHECK_TOKEN = gql`
  query CheckToken {
    checkToken {
      id
      name
      email
    }
  }
`;
