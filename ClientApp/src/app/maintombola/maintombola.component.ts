import { Component} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {MainTombola} from './maintombola.interface';
import {CREATE_NUMBERS} from './mutations';
import {NUMBERS_TRUE_QUERY} from './queries';
import swal from 'sweetalert';

@Component({
  selector: 'app-maintombola',
  templateUrl: './maintombola.component.html',
  styleUrls: ['./maintombola.component.css']
})
export class MaintombolaComponent {

  number:MainTombola[];
  createNumber: MainTombola

  constructor(private apollo: Apollo) { 
    this.getNumbersTrue();
  }

  save(){
    for (var i = 1; i < 76; i++) {
    const variables ={
      input:{
        number: i,
        isChosen: false,
        roomsId:1
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


}
