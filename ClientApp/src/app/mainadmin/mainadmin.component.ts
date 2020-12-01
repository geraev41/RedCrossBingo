import { Component , Inject} from '@angular/core';
import {ROOMS_QUERY} from './queries';
import {Rooms} from './mainadmin.interface'
import {Apollo} from 'apollo-angular';
import {CREATE_ROOM, DELETE_ROOMS} from './mutations'
import swal from 'sweetalert';

import {Login} from './../login/login.interface';

@Component({
  selector: 'app-mainadmin',
  templateUrl: './mainadmin.component.html',
  styleUrls: ['./mainadmin.component.css']
})


export class MainadminComponent {
  rooms: Rooms[];
  private room: Rooms; 
  private error = '';
  private userLogueado : Login; 
  constructor(private apollo: Apollo,  @Inject('BASE_URL') public baseUrl: string) {
    this.getRooms();
    this.newRoom(); 
    this.userInSession(); 
   }

  userInSession(){
     var user = JSON.parse(sessionStorage.getItem('user')); 
     this.userLogueado = {
      id : user['id'],
      email: user['email'],
      password: user['password']
     }
   }

newRoom(){
  this.room = {
    id: 0, 
    name: '',
    url: ''    
  }
}

createRoom(){
  
  try {
    this.validateRoom(); 
    this.save(); 
  } catch (error) {
    this.error = error.message;
    setTimeout(()=> {
      this.error = ''; 
    }, 3000);
  }
}

save(){
   var newUrl = this.baseUrl+this.room.name; 
  const variables = {
    input: {name: this.room.name, url: newUrl, usersId:this.userLogueado.id} 
  };
  this.apollo.mutate({
    mutation : CREATE_ROOM,
    variables: variables
  }).subscribe(result=>{
    console.log(result.data); 
    this.getRooms(); 
  }); 
}


validateRoom(){
  this.error = ''; 
  var name = this.room.name.toLowerCase().trim().replace(/ /g, "");
  if(name== ''){
    throw new Error("You must write name of the room!");
  }

  this.room.name = name; 
}

 getRooms(){
  this.apollo.watchQuery({
    query: ROOMS_QUERY,
    fetchPolicy:'network-only',
    variables:{}
  }).valueChanges.subscribe(result=>{
    this.rooms= result.data.roomsRep;
    console.log(this.rooms);
  })
 }


 deleteRoom(room:Rooms){
  swal({
    title: "Are you sure?",
    text: "Do you want to remove this file from your information!!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })  
  .then((willDelete) => {
    if (willDelete) {
      this.apollo.mutate({
             mutation: DELETE_ROOMS,
             variables:{id: room.id}
           }).subscribe(result=>{
             this.getRooms();
           })
      swal("Room removed successfully!", {
        icon: "success",
      });
    } else {
     
    }
  });
 }





}
