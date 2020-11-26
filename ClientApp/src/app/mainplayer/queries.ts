
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