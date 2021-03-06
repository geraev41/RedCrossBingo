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
import {GameComponent} from './game/game.component';
import {MaintombolaComponent} from './maintombola/maintombola.component';

import { JwtModule } from '@auth0/angular-jwt';
import {AuthService} from './services/auth.service';

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
    MainadminComponent,
    GameComponent,
    MaintombolaComponent
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
      { path: 'player/:room', component: MainplayerComponent },
      { path: 'admin', component: MainadminComponent, canActivate: [AuthService] },
      { path: 'game/:room', component: GameComponent },
      { path: 'tombola/:room', component: MaintombolaComponent, canActivate: [AuthService] },

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
