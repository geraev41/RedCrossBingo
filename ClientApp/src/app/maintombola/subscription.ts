
import gql from 'graphql-tag';

export const SEND_NUMBER = gql`
  mutation($input : BingoNumbersInput!) {
    sendBingoMessage(message: $input){
        number
        isChosen
        roomsId
      }
    }
`;