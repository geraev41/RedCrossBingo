import gql from 'graphql-tag';

export const USERS_QUERY = gql`
query($email:String, $password:String){
    users(email:$email, password:$password){
      id
      email
      password
    }
  }
`;