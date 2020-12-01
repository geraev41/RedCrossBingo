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

  private cards: BingoCard[]; 
  constructor(private Apollo: Apollo) {
    this.cards = []; 
    this.searchInStorage(); 
   }

  ngOnInit(): void {
  }


  searchInStorage(){
    let ids= JSON.parse(sessionStorage.getItem("listCards")); 
    let list =ids.values as [];
    for (let i = 0; i <list.length; i++) {
       this.loadCards(list[i]); 
    }
  }


  loadCards(id_card){
    this.Apollo.watchQuery({
      query : BINGOCARD,
      fetchPolicy: 'network-only',
      variables: {
        id: id_card
      }
    }).valueChanges.subscribe(result=>{
        this.cards.push(result.data.card); 
    }); 
  }

}
