import gql from 'graphql-tag';

export const CREATE_NUMBERS = gql`
mutation($input:BingoNumbersInput!){
    createBingoNumber(input:$input){
      id
      number
      isChosen
      roomsId
    }
  }
`;

export const UPDATE_NUMBER = gql`
    mutation($id: ID!, $input: BingoNumbersInput!) {
      updateBingoNumber(id: $id, input: $input) {
            id
            number
            isChosen
           
        }
    }
`;