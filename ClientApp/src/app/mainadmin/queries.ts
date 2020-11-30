import gql from 'graphql-tag';

export const ROOMS_QUERY = gql`
query{
    roomsRep{
      id
      name
      url
    }
}
`;