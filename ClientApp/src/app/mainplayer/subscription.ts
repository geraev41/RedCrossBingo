
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