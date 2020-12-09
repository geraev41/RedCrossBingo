import {NgModule} from '@angular/core';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {ApolloClientOptions, InMemoryCache} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import { WebSocketLink} from '@apollo/client/link/ws'; 

const uri = 'https://localhost:5001/graphql'; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    link: httpLink.create({uri}),
    cache: new InMemoryCache(),
  };
}

export function createApolloWs(httpLink: HttpLink) : ApolloClientOptions<any> {
  return {
    link: new WebSocketLink({
      uri: 'wss://localhost:5001/graphql',
      options: {
        reconnect: true
      }
    }),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApolloWs,
    }
  ],
})
export class GraphQLModule {}
