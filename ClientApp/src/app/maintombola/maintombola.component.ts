import { Component} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {MainTombola} from './maintombola.interface';
import {CREATE_NUMBERS} from './mutations';
import {NUMBERS_TRUE_QUERY} from './queries';
import swal from 'sweetalert';
import { Rooms } from '../mainadmin/mainadmin.interface';
import { ActivatedRoute } from '@angular/router';
import {ROOM_NAME} from './../mainplayer/queries';

@Component({
  selector: 'app-maintombola',
  templateUrl: './maintombola.component.html',
  styleUrls: ['./maintombola.component.css']
})
export class MaintombolaComponent {

  number:MainTombola[];
  createNumber: MainTombola
  private room : Rooms; 

  constructor(private apollo: Apollo,private _route: ActivatedRoute) { 
    this.getRoom();
    this.getNumbersTrue();
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
      swal("jajajajja!", "guardando varas!", "success");
    })
  };
  }

  getNumbersTrue(){
    this.apollo.watchQuery({
      query: NUMBERS_TRUE_QUERY,
      fetchPolicy:'network-only',
      variables:{}
    }).valueChanges.subscribe(result=>{
      this.number= result.data.bingoNumTrue;
    })
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
        this.room = result.data.getRoomName; 
    }); 
  }
}
