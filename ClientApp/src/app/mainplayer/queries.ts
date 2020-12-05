
import gql from 'graphql-tag';


export const BINGOCARD = gql`
    query{
        cards{
            id
            isPlaying
            roomsId
            numbers{
                number
                isSelected
            }
            
        }
    }
`;

export const BINGOCARDID = gql`
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

export const ROOM_NAME = gql`
    query room($name: String!){
        getRoomName(name: $name){
            id
            name
        }
    }
`;