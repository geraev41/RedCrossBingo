using GraphQL.Types;
using RedCrossBingo.Models; 
using RedCrossBingo.GraphQL.Types;
using System;
using GraphQL.Resolvers; 

namespace  RedCrossBingo.GraphQL {

    class RedCrossSubscription : ObjectGraphType
    {
        private readonly IBingoChat _bingo; 
        public RedCrossSubscription (IBingoChat bingo){
           _bingo = bingo; 
            AddField(
                new EventStreamFieldType{
                    Name = "numberReceived",
                    Type = typeof(BingoNumbersType),
                    Subscriber = new EventStreamResolver<BingoNumbers>(Suscribe),
                    Resolver = new FuncFieldResolver<BingoNumbers>(ResolveMessage),
                }
            );
        }
        private  IObservable<BingoNumbers> Suscribe(ResolveFieldContext<object> context){
            return _bingo.BingoMessages(); 
        }

        private BingoNumbers ResolveMessage(ResolveFieldContext<object> context){
            var message = context.Source as BingoNumbers; 
            return message; 
        }
    }
}