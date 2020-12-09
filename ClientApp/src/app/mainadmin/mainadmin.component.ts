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
    this.newRoom(); 
  } catch (error) {
    this.error = error.message;
    setTimeout(()=> {
      this.error = ''; 
    }, 3000);
  }
}

save(){
  var newUrl =  `${this.baseUrl}${'player/'}${this.room.name}`
  const variables = {
    input: {name: this.room.name, url: newUrl, usersId:this.userLogueado.id} 
  };
  this.apollo.mutate({
    mutation : CREATE_ROOM,
    variables: variables
  }).subscribe(result=>{
    this.getRooms(); 
  }); 
}


validateRoom(){
  this.error = ''; 
  var name = this.room.name.toLowerCase().trim().replace(/ /g, "");
  if(name == ''){
    throw new Error("You must write name of the room!");
  }

  if(this.rooms.find(x=> x.name == name)){
    throw new Error("The name of this room already exists!");
  }
  this.room.name = name; 
}
 getRooms(){
  this.apollo.watchQuery({
    query: ROOMS_QUERY,
    fetchPolicy:'network-only',
    variables:{}
  }).valueChanges.subscribe(result=>{
    this.rooms= result.data['roomsRep'];
  })
 }


 deleteRoom(room:Rooms){
 
  swal({
    title: "Are you sure?",
    text: "Do you want to remove this file from your information!!",
    icon: "warning",
    buttons: ["Cancel", "Delete"],
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

 openRoom(r : Rooms){
   var url = `${this.baseUrl}${'tombola/'}${r.name}`
   window.open(url); 
 }

 logout() {
  swal({
    title: "Exit the game",
    text: "Are you sure you want to exit the game?",
    icon: "warning",
    buttons: ["Cancel", "Exit"],
    dangerMode: true,
  })  
  .then((willDelete) => {
    if (willDelete) {
      sessionStorage.clear();
  window.location.href = 'https://localhost:5001/login';
    } 
  });
 }

 
}


