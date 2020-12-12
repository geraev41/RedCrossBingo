
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

export const UPDATE_CARD_NUMBER =  gql`
 mutation($id:ID!, $input:BingoCardNumbersInput!) {
  updateNumber(id:$id, input:$input ){
    id
    isSelected
    number
    bingoCardsId
    }
  }
`;