import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ActivatedRoute } from '@angular/router';
import { BingoCard } from './bingocard.interface';
import { BingoCardNumber } from './bingocardnumber.interface';
import {CREATE_CARD} from './mutations'; 
import {CREATE_CARD_NUMBER} from './mutations'; 
import {ROOM_NAME, BINGOCARDID} from './queries';
import {Router} from '@angular/router';
import { Rooms } from '../mainadmin/mainadmin.interface';

@Component({
  selector: 'app-mainplayer',
  templateUrl: './mainplayer.component.html',
  styleUrls: ['./mainplayer.component.css']
})
export class MainplayerComponent  {

  private RoomId = 0; 
  private room : Rooms; 
  private Card : BingoCard;
  private numbersCards = 0;  
  private numberForCard : BingoCardNumber;
  private isCard = false; 
  private cards : BingoCard[];

  constructor( private Apollo: Apollo,private _route: ActivatedRoute,private route: Router) {
    this.newCard(); 
    this.getRoom(); 
    this.cardsInSessionStorage(); 
   }
   
validate(){
  if(!this.cards){
    this.isCard = true; 
    return; 
  }
  this.isCard = false; 
}
  newCard(){
    this.Card={
      id: 0,
      isPlaying: false, 
      roomsId: this.RoomId,
      bingoCardNumbers: null
    }
  }

watchCards(){
 // this.cardsInSessionStorage();
  setTimeout(()=> {
    this.cardsInSessionStorage();
  }, 3000);
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
    this.validate(); 
    if(this.RoomId == 0){
      alert("You changed the url name!"); 
      return; 
    }
    for (let  i = 0; i < this.numbersCards; i++) {
      this.saveBingoCard();
      this.newCard(); 
    }
    this.isCard = false;     
  }

cardsInSessionStorage(){
  let ids= JSON.parse(sessionStorage.getItem("listCards")); 
  if(ids){
    this.cards = []; 
    console.log("Despues de inicializar la lista: "+ this.cards);
    let list =ids.values as [];
    for (let i = 0; i <list.length; i++) {
       this.loadCards(list[i]); 
    }
  }
  this.validate();
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
  this.saveIdCardInSessionStorage(this.Card.id); 
}

saveNumber(){
  const variables = {
    input: {number:this.numberForCard.number, isSelected: false, bingoCardsId:this.Card.id}
  };
  this.Apollo.mutate({
    mutation : CREATE_CARD_NUMBER,
    variables: variables
  }).subscribe(result=>{
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

getRoom(){
  var room = this._route.snapshot.paramMap.get("room");
  this.Apollo.watchQuery({
    query : ROOM_NAME,
    fetchPolicy: 'network-only',
    variables: {
      name: room
    }
  }).valueChanges.subscribe(result=>{
    if(result.data.getRoomName){
      this.RoomId = result.data.getRoomName.id; 
      this.room = result.data.getRoomName; 
    }
  }); 
}

loadCards(id_card){
  this.Apollo.watchQuery({
    query : BINGOCARDID,
    fetchPolicy: 'network-only',
    variables: {
      id: id_card
    }
  }).valueChanges.subscribe(result=>{
      this.cards.push(result.data.card); 
  }); 
}
}
