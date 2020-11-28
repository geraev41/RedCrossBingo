import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { threadId } from 'worker_threads';
import { BingoCard } from './bingocard.interface';
import { BingoCardNumber } from './bingocardnumber.interface';
import {CREATE_CARD} from './mutations'; 
import {CREATE_CARD_NUMBER} from './mutations'; 


@Component({
  selector: 'app-mainplayer',
  templateUrl: './mainplayer.component.html',
  styleUrls: ['./mainplayer.component.css']
})
export class MainplayerComponent  {

  private RoomId = 1; 
  private Card : BingoCard;
  private numbersCards = 0;  
  private numberForCard : BingoCardNumber; 

  constructor( private Apollo: Apollo) {
    this.newCard(); 

   }

  newCard(){
    this.Card={
      id: 0,
      isPlaying: false, 
      roomsId: this.RoomId,
      bingoCardNumbers: null
    }
  }

  newNumberForCard(){
    this.numberForCard= {
      id : 0,
      bingoCardsId : 0,
      number: 0,
      isSelected: false
    }
  }
  

  createCards(){
    for (let  i = 0; i < this.numbersCards; i++) {
      this.saveBingoCard();
      this.newCard(); 
    }
  }

  saveBingoCard(){
    const variables = {
      input: {roomsId: this.RoomId, isPlaying: false} 
    };
    this.Apollo.mutate({
      mutation : CREATE_CARD,
      variables: variables
    }).subscribe(result=>{
      this.Card = result.data.createCard;
      this.newNumberForCard(); 
      this.generateNumbers(); 
      this.saveIdCardInSessionStorage(this.Card.id); 

    }); 
  }

/**
 * Generate numbers for each card, numbers is ramdom
 */
generateNumbers(){
  let list = [];
  let num = this.getRamdon();
  for(let i = 0; i < 25; i++){
      while(list.includes(num)){
          num = this.getRamdon();
      }
      list.push(num); 
      this.numberForCard.number = num; 
      this.saveNumber(); 
      num = this.getRamdon();
  }
}

saveNumber(){
  const variables = {
    input: {number:this.numberForCard.number, isSelected: false, bingoCardsId:this.Card.id}
  };
  this.Apollo.mutate({
    mutation : CREATE_CARD_NUMBER,
    variables: variables
  }).subscribe(result=>{
    console.log(result); 
  }); 
}

  getRamdon(){
    const min=1;
    const max=75;
    return  Math.floor(Math.random()*(max-min+1)+min);
  }


/**
 * save id the card in the session storage for to use
 * @param id_card id of card
 */
saveIdCardInSessionStorage(id_card: number){
  let values = JSON.parse(sessionStorage.getItem("listCards"));
  let data ; 
    if(values){    
        data= values; 
        if(!data.values.includes(id_card)){
          data.values = [...data.values, id_card]
        }
     }else{
      data = {values: [id_card]}

     }
    sessionStorage.setItem("listCards", JSON.stringify(data)); 
}

}
