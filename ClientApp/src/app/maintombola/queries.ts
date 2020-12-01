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