import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { GraphQLModule } from './graphql.module';

import { LoginComponent } from './login/login.component';
import { MainplayerComponent } from './mainplayer/mainplayer.component';
import {MainadminComponent} from './mainadmin/mainadmin.component';

import { JwtModule } from '@auth0/angular-jwt';
import {AuthService} from './services/auth.service';
import { from } from 'rxjs';


export function tokenGetter() {
  let result: [];
   result = JSON.parse(sessionStorage.getItem('user'));
   if(result){
     return result['token'];
   }
   return "";
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    LoginComponent, 
    MainplayerComponent,
    MainadminComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent, canActivate: [AuthService] },
      { path: 'fetch-data', component: FetchDataComponent },

      { path: 'login', component: LoginComponent },
      { path: 'player', component: MainplayerComponent },
      { path: 'admin', component: MainadminComponent, canActivate: [AuthService] },
    ]),
    GraphQLModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['https://localhost:5001/'],
        disallowedRoutes:[]
      }
    })
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
