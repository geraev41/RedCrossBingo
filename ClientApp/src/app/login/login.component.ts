import { Component} from '@angular/core';
import {USERS_QUERY} from './queries';
import {Login} from './login.interface';
import {Apollo} from 'apollo-angular';
import swal from 'sweetalert';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  email_filter:'';
  password_filter:'';

  constructor(private apollo: Apollo) {
    
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
       
      if(result.data.login){
        sessionStorage.setItem("user", JSON.stringify(result.data.login)); 
        // this.router.navigate(['/counter']);
        swal("Log in!", "You have successfully logged in!", "success");
        window.location.href = 'https://localhost:5001/admin';
      }else if(result.data){
        swal("Log in!", "Email or password incorrect!", "warning");       
      }

    });
   }


}
