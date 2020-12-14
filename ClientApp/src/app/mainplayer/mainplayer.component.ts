import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ActivatedRoute } from '@angular/router';
import { BingoCard } from './bingocard.interface';
import { BingoCardNumber } from './bingocardnumber.interface';
import {CREATE_CARD} from './mutations'; 
import {CREATE_CARD_NUMBER, UPDATE_CARD_NUMBER} from './mutations'; 
import {ROOM_NAME, BINGOCARDID} from './queries';
import {Router} from '@angular/router';
import { Rooms } from '../mainadmin/mainadmin.interface';
import {MainTombola } from './../maintombola/maintombola.interface';
import {NUMBERS_TRUE_QUERY } from './../maintombola/queries';
import {RECEIVED_NUMBER, SEND_WINNER, RECEIVED_MESSAGE} from './subscription';
import swal from 'sweetalert';



@Component({
  selector: 'app-mainplayer',
  templateUrl: './mainplayer.component.html',
  styleUrls: ['./mainplayer.component.css']
})
export class MainplayerComponent  implements OnInit  {

  private RoomId = 0; 
  private room : Rooms; 
  private Card : BingoCard;
  private numbersCards = 0;  
  private numberForCard : BingoCardNumber;
  private isCard = false; 
  private cards : BingoCard[];
  private progressbar = false; 
  private hiddenButton = false; 
  private numberTombola : number[] = []; 
  private numberReceive = 0; 
  private cardNew : BingoCard; 
  private numberUpdate: BingoCardNumber; 
  public IsWinner : boolean =  false; //for to know is winner or lose

  constructor( private Apollo: Apollo,private _route: ActivatedRoute,private route: Router) {
    this.newCard(); 
    this.getRoom(); 
   }

  ngOnInit(): void {
    this.Apollo.subscribe(
      {
      query: RECEIVED_NUMBER,
    }).subscribe((result)=>{
      var num = result.data['numberReceived'].number; 
      if(!this.numberTombola.includes(num)){
          this.numberTombola.push(num);
          this.numberReceive = num; 
          this.updateNumberIsSelected(num); 
      }
    }); 

    this.Apollo.subscribe({
      query: RECEIVED_MESSAGE
    }).subscribe((result)=>{
      if(!result.data['messageReceived'].isWinner && !this.IsWinner){
        let emojiSad  = "😔"; 
        this.showAler(emojiSad, "Game Over\nGood Luck for next time!"); 
      }else if(!result.data['messageReceived'].isWinner && this.IsWinner){
        let emojiHappy = "😎";
        this.showAler(emojiHappy, "You are the winner!"); 
      }
    });
  }


   /**
   * 
   * @param emoji is face, if is winner is happy, and if is lose is sad
   * @param msj message or winner or loser
   */
  showAler(emoji: string, msj: string){
    swal({
      title: emoji,
      text: msj, 
      buttons: {
        Ok: true,
      }
    });
  }
  

  /**
   * Search in card number receive and update isSelected
   * @param number receive get of tombola
   */
  updateNumberIsSelected(number: Number) {
    this.cards.forEach(card => {
        var contador = 0; 
        card.bingoCardNumbers.forEach(n => {
          if(n.number == number){
            n = {...n}; 
            n.isSelected = true; 
            this.numberUpdate = n; 
            card.bingoCardNumbers.splice(contador, 1, n); 
            if(this.isWinner(card)){
              this.IsWinner = true; 
              this.sendMessageWinner(); 
            }
          }
          contador++; 
        });

    });
}

/**
 * Send message winner
 */
sendMessageWinner(){
  const variables = {
    input: {body: '', isWinner:!this.IsWinner}
  };
  this.Apollo.mutate({
    mutation : SEND_WINNER,
    variables : variables
  }).subscribe(result=>{
  });
}

/**
 * Search card with numers all selecteds
 * @param card 
 */
isWinner(card: BingoCard){
  let isWinner = true; 
  card.bingoCardNumbers.forEach(number => {
    if(!number.isSelected){
      isWinner =  false; 
      return isWinner; 
    }
  });
  return isWinner; 
}

/**
 * update number in the db
 * @param number to update
 */
updateCardNumber(){
  if(this.numberUpdate.id > 0){
    this.cards = []; 
    this.Apollo.mutate({
      mutation: UPDATE_CARD_NUMBER,
      variables:{
        id: this.numberUpdate.id,
        input:{
          number: this.numberUpdate.number,
          isSelected:this.numberUpdate.isSelected,
          bingoCardsId: this.numberUpdate.bingoCardsId
        }
      } 
    }).subscribe((result) => {
      this.cleanUpdateNumber(); 
    });
  }
}

/**
 * Cleaning object number
 */
cleanUpdateNumber(){
  this.numberUpdate = {
    id: 0, 
    bingoCardsId: 0,
    number: 0,
    isSelected: false
  };
}
/**
 * Get numbers of tombola playing
 */
getNumbersTombola(){
  this.Apollo.watchQuery({
    query : NUMBERS_TRUE_QUERY,
    fetchPolicy: 'network-only',
    variables: {
      roomsId:this.room.id
    }
  }).valueChanges.subscribe(result=>{
   // this.numberTombola= result.data['bingoNumTrue']; 
    result.data['bingoNumTrue'].forEach(e=> {
      this.numberTombola.push(e.number); 
    });
  }); 
  this.cardsInSessionStorage(); 
}

/**
 * Validate list of cards
 */
validate(){
  if(!this.cards){
    this.isCard = true; 
    return; 
  }
  this.isCard = false; 
}
/**
 * Initialize card
 */
newCard(){
    this.Card={
      id: 0,
      isPlaying: false, 
      roomsId: this.RoomId,
      bingoCardNumbers: null
    }
  }

/**
 * See cards selected
 */
watchCards(){
  this.hiddenButton = true; 
  this.progressbar = true; 
  setTimeout(()=> {
    this.cardsInSessionStorage();
    this.progressbar = false; 
  }, 3000);
}

/**
 * New number for card
 */
newNumberForCard(){
    this.numberForCard= {
      id : 0,
      bingoCardsId : 0,
      number: 0,
      isSelected: false
    }
  }
/**
 * Create cards
 */
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
/**
 * get id of cards in session storage
 */
cardsInSessionStorage(){
  let ids= JSON.parse(sessionStorage.getItem("listCards")); 
  if(ids){
    this.hiddenButton = true; 
    this.cards = []; 
    let list =ids.values as [];
    for (let i = 0; i <list.length; i++) {
       this.loadCards(list[i]); 
    }
  }
  this.validate();
 
}

/**
 * search for every card, numbers get in the tombola
 */
seeNumbersOfTombola(){
  this.numberTombola.forEach(number => {
    this.cards.forEach(card =>{
      var contador = 0; 
        card.bingoCardNumbers.forEach(numberCard=>{
          if(numberCard.number == number){
            numberCard = {...numberCard}; 
            numberCard.isSelected = true; 
            card.bingoCardNumbers.splice(contador, 1, numberCard); 
          }
          contador++; 
        }); 
    });
  });
}

/**
 * Save card in the db
 */
saveBingoCard(){
    const variables = {
      input: {roomsId: this.RoomId, isPlaying: false} 
    };
    this.Apollo.mutate({
      mutation : CREATE_CARD,
      variables: variables
    }).subscribe(result=>{
      this.Card = result.data['createCard'];
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

/**
 * Save number for card
 */
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

/**
 * Get number ramdon in range 1 at 75
 */
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

/**
 * Get room for name
 */
getRoom(){
  var room = this._route.snapshot.paramMap.get("room");
  this.Apollo.watchQuery({
    query : ROOM_NAME,
    fetchPolicy: 'network-only',
    variables: {
      name: room
    }
  }).valueChanges.subscribe(result=>{
    if(result.data['getRoomName']){
      this.RoomId = result.data['getRoomName'].id; 
      this.room = result.data['getRoomName']; 
      this.getNumbersTombola(); 
    }
  }); 
}

/**
 * load cards with for id card
 * @param id_card 
 */
loadCards(id_card){
  this.Apollo.watchQuery({
    query : BINGOCARDID,
    fetchPolicy: 'network-only',
    variables: {
      id: id_card
    }
  }).valueChanges.subscribe(result=>{
    var card = this.convertToRead(result.data['card']); 
    this.cards.push(card); 
    this.seeNumbersOfTombola(); 
  }); 
}

/**
 * Convert to object card at write
 * @param card 
 */
convertToRead(card: BingoCard){
    var listCardNumbers = [...card.bingoCardNumbers]; 
    this.cardNew = {
      id : card.id,
      isPlaying: card.isPlaying,
      roomsId: card.roomsId,
      bingoCardNumbers: listCardNumbers
    }
    return this.cardNew; 
}

}
