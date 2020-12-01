
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



export const ROOM_NAME = gql`
    query room($name: String!){
        getRoomName(name: $name){
            id
            name
        }
    }
`;