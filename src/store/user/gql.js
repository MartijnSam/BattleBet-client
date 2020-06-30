import gql from "graphql-tag";

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        userName
        email
        avatar
      }
    }
  }
`;

export const CHECK_TOKEN = gql`
  query CheckToken {
    checkToken {
      id
      userName
      email
      avatar
    }
  }
`;

export const SIGNUP = gql`
  mutation signUp($userName: String!, $email: String!, $password: String!) {
    signup(userName: $userName, email: $email, password: $password) {
      token
      user {
        id
        email
        userName
        avatar
      }
    }
  }
`;
