import { Component} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {MainTombola} from './maintombola.interface';
import {CREATE_NUMBERS, UPDATE_NUMBER} from './mutations';
import {NUMBERS_TRUE_QUERY, NUMBERS_FALSE_QUERY,NUMBERS_TOMBOLA_QUERY} from './queries';
import swal from 'sweetalert';
import { Rooms } from '../mainadmin/mainadmin.interface';
import { ActivatedRoute } from '@angular/router';
import {ROOM_NAME} from './../mainplayer/queries';
import {SEND_NUMBER} from './subscription';


@Component({
  selector: 'app-maintombola',
  templateUrl: './maintombola.component.html',
  styleUrls: ['./maintombola.component.css']
})
export class MaintombolaComponent {
  number:MainTombola[];
  createNumber: MainTombola
  private room : Rooms; 
  numberPlaying:MainTombola;
  newNumber: number[];
  isChosen:MainTombola;
  hiddenBtnTombola=false;
  numbersTombola:number[];
  constructor(private apollo: Apollo,private _route: ActivatedRoute) {
    this.newNumber = []; 
    this.getRoom();
    
  }

  save(){
    for (var i = 1; i < 76; i++) {
    const variables ={
      input:{
        number: i,
        isChosen: false,
        roomsId:this.room.id
      }
    }
    
    this.apollo.mutate({
      mutation : CREATE_NUMBERS,
      variables : variables
    }).subscribe(()=>{
      swal("Tombola!", "Tombola ready to play!", "success");
    })
  };
  this.hiddenBtnTombola=true;
  
  }



  getNumbersTrue(){
    this.apollo.watchQuery({
      query: NUMBERS_TRUE_QUERY,
      fetchPolicy:'network-only',
      variables:{
        roomsId:this.room.id
      }
    }).valueChanges.subscribe(result=>{
      this.newNumber = [];
      result.data['bingoNumTrue'].forEach(element => {
        this.newNumber.push(element.number);
      });
      
    })
   }

   getNumbers(){
     var random = this.getRamdon();
     while (this.newNumber.includes(random)) {
      random = this.getRamdon();
    }
    this.apollo.watchQuery({
      query: NUMBERS_FALSE_QUERY,
      fetchPolicy:'network-only',
      variables:{
        number:random,
        roomsId:this.room.id
      }
    }).valueChanges.subscribe(result=>{
      this.newNumber.push(result.data['bingoNumFalse'].number);
      this.numberPlaying= result.data['bingoNumFalse'].number;
      this.isChosen = result.data['bingoNumFalse']; 
      this.isChosen = {...this.isChosen}
      this.isChosen.isChosen=true;
      this.updateNumber();
      this.sendMessage();
    })
   }


   sendMessage(){
    const variables = {
      input: {number: this.isChosen.number, isChosen: this.isChosen.isChosen,
         roomsId : this.isChosen.roomsId} 
    };
    this.apollo.mutate({
      mutation : SEND_NUMBER,
      variables : variables
    }).subscribe(result=>{

    });
   }

   getRoom(){
    var room = this._route.snapshot.paramMap.get("room");
    this.apollo.watchQuery({
      query : ROOM_NAME,
      fetchPolicy: 'network-only',
      variables: {
        name: room
      }
    }).valueChanges.subscribe(result=>{
        this.room = result.data['getRoomName']; 
        this.getNumbersTrue();
        this.getNumbersTombola();
    }); 
    
  }

   getRamdon(){
      const min=1;
      const max=75;
      return  Math.floor(Math.random()*(max-min+1)+min);
    }

    updateNumber(){
    this.apollo.mutate({
      mutation: UPDATE_NUMBER,
      variables:{
        id:this.isChosen.id,
        input:{
          number:this.isChosen.number,
          isChosen:this.isChosen.isChosen,
          roomsId:this.isChosen.roomsId
        }
      } 
    }).subscribe(() => {
      this.getNumbersTrue();   
    });
    }

    getNumbersTombola(){
      this.apollo.watchQuery({
        query : NUMBERS_TOMBOLA_QUERY,
        fetchPolicy: 'network-only',
        variables: {
          roomsId:this.room.id
        }
      }).valueChanges.subscribe(result=>{
        this.numbersTombola = [];
        console.log(result.data);
        this.numbersTombola= result.data['bingoNum'];
        if(this.numbersTombola.length > 0){
          this.hiddenBtnTombola=true;
        }else{
          this.hiddenBtnTombola=false;
        }
      });
      
      
    }

}
