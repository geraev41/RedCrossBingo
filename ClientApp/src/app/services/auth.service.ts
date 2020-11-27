import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CanActivate, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  constructor(private JwtHelper: JwtHelperService, private Router: Router) { 
    
  }



  canActivate(){
    var user = JSON.parse(sessionStorage.getItem("user")); 
    if(user){
      const token = user['token'];
      if(token && !this.JwtHelper.isTokenExpired(token)){
        return true;
      }
    }
    sessionStorage.clear();
    this.Router.navigate(['login']);
    return false; 
  }
}

