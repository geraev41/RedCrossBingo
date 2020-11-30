import gql from 'graphql-tag';

export const DELETE_ROOMS = gql`
mutation($id: ID!){
    deleteRoom(id:$id){
      id   
    }
}
`;