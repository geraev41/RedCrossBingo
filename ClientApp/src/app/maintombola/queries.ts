import gql from 'graphql-tag';

export const NUMBERS_TRUE_QUERY = gql`
query{
  bingoNumTrue{
    id
    isChosen
    number
  }
}
`;

export const NUMBERS_FALSE_QUERY = gql`
query($number:Int!){
  bingoNumFalse(number:$number){
    id
    number
    isChosen
    roomsId
  }
}
`;