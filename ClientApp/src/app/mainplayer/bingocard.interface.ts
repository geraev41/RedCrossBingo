import { BingoCardNumber } from './bingocardnumber.interface';
export interface BingoCard{
    id: number;
    roomsId: number;
    bingoCardNumbers: Array<BingoCardNumber>;
    isPlaying: boolean; 
}