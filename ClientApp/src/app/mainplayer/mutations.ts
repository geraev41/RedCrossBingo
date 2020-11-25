
import gql from 'graphql-tag';

export const CREATE_CARD =  gql`
mutation createCard($input: BingoCardInput!){
  createCard(input: $input){
    id
    roomsId
    isPlaying
  }
}
`;


export const CREATE_CARD_NUMBER =  gql`
mutation createNumber($input: BingoCardNumbersInput!){
  createNumber(input: $input){
    id
    number
    isSelected
    bingoCardsId
  }
}
`;