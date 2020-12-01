import gql from 'graphql-tag';

export const DELETE_ROOMS = gql`
  mutation($id: ID!){
      deleteRoom(id:$id){
        id   
      }
  }
`;

export const CREATE_ROOM = gql`
  mutation createRoom($input : RoomInput!){
    createRoom(input :$input){
      id
      name
      url
    }
  }
`;