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