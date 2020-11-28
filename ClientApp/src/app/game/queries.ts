import gql from 'graphql-tag';


export const BINGOCARD = gql`
    query card($id: ID!){
        card(id: $id){
            id
            isPlaying
            roomsId
            bingoCardNumbers{
                id
                number
            }
        }
    }
`;