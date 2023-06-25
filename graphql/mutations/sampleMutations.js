import {gql} from '@apollo/client';

//  export const REGISTER_USER = gql`
//  mutation Register(
//   $username: String!
//   $password: String!
//   $confirmPassword: String!
//   $account_email: String
//   $account_mobile: String
//   $role: String!
//   ) {
//   register(registerInput: {
//     username:$username
//     password:$password
//     confirmPassword:$confirmPassword
//     account_email:$account_email
//     account_mobile:$account_mobile
//     role:$role
//   }) {
//     id
//     token
//     username
//     date_joined
//     role
//     isLoggedIn
//     account_email
//     account_mobile
//   }
// }
//  `;


//Just copy paste from apollo playground
export const REGISTER_USER = gql`
 mutation Register($registerInput: RegisterInput) {
  register(registerInput: $registerInput) {
    id
    token
    username
    date_joined
    role
    isLoggedIn
    account_mobile
    account_email
  }
}
 `;

 export const LOGIN_USER = gql`
  mutation Login($loginCred: String!, $password: String!) {
  login(login_cred: $loginCred, password: $password) {
    id
    token
    username
    date_joined
    account_mobile
    account_email
    role
  }
}
 `;