import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {ROOMS_QUERY} from './queries';
import {Rooms} from './mainadmin.interface'
import {Apollo} from 'apollo-angular';
import {DELETE_ROOMS} from './mutations'
import swal from 'sweetalert';

@Component({
  selector: 'app-mainadmin',
  templateUrl: './mainadmin.component.html',
  styleUrls: ['./mainadmin.component.css']
})


export class MainadminComponent {
  rooms: Rooms[];

  constructor(private apollo: Apollo) {
    this.getRooms();
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
