import gql from 'graphql-tag';

export const NUMBERS_TRUE_QUERY = gql`
query($roomsId:Int!){
  bingoNumTrue(roomsId:$roomsId){
    id
    isChosen
    number
    roomsId
  }
}
`;

export const NUMBERS_FALSE_QUERY = gql`
query($number:Int!,$roomsId:Int!){
  bingoNumFalse(number:$number,roomsId:$roomsId){
    id
    number
    isChosen
    roomsId
  }
}
`;

export const NUMBERS_TOMBOLA_QUERY = gql`
query($roomsId:Int!){
  bingoNum(roomsId:$roomsId){
    id
    number
    isChosen
    roomsId
  }
}
`;