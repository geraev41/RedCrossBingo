import gql from 'graphql-tag';

export const USERS_QUERY = gql`
query($email:String, $password:String){
    login(email:$email, password:$password){
      id
      email
      password
      token
    }
  }
`;