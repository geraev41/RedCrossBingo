import { Component, OnInit } from '@angular/core';
import { BingoCard } from '../mainplayer/bingocard.interface';
import { BINGOCARD} from './queries';
import { Apollo } from 'apollo-angular';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  private cardsTest: number[] = [4,5,6]; 

  private cards: BingoCard[]; 
  constructor(private Apollo: Apollo) {
    this.cards = []; 
    this.searchInStorage(); 
   }

  ngOnInit(): void {
  }


  searchInStorage(){
     this.cardsTest.forEach(id => {
      this.loadCards(id); 
     });
  }


  loadCards(id_card){
    
    this.Apollo.watchQuery({
      query : BINGOCARD,
      fetchPolicy: 'network-only',
      variables: {
        id: id_card
      }
    }).valueChanges.subscribe(result=>{
      console.log(result.data.card); 
        this.cards.push(result.data.card); 
    }); 
  }

}
