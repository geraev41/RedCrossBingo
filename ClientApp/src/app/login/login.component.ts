import { Component} from '@angular/core';
import {USERS_QUERY} from './queries';
import {Login} from './login.interface';
import {Apollo} from 'apollo-angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  email_filter:'';
  password_filter:'';

  constructor(private apollo: Apollo) {
    this.login();
   }

   login(){
     this.apollo.watchQuery({
       query:USERS_QUERY,
       fetchPolicy: 'network-only',
       variables:{
        email:this.email_filter,
        password:this.password_filter
       }
     }).valueChanges.subscribe(result =>{
      if(result){
        alert("es correcto");
      }else if(!result){
        alert("no coincide");
      }
    });
   }


}
