
import gql from 'graphql-tag';

export const RECEIVED_NUMBER = gql`
 subscription{
    numberReceived{
        id
        isChosen
        number
    }
}
`;

export const RECEIVED_MESSAGE = gql`
    subscription{
        messageReceived{
            body
            isWinner
        }
    }
  `;

export const SEND_WINNER = gql`
  mutation($input:MessageInput!) {
    sendMessageWinner(message: $input){
        body
        isWinner
      }
    }
`;