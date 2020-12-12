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
            FieldMessage(); 
        }

        private void FieldMessage(){
             AddField(
                new EventStreamFieldType{
                    Name = "messageReceived",
                    Type = typeof(MessageType),
                    Subscriber = new EventStreamResolver<Message>(SuscribeMessage),
                    Resolver = new FuncFieldResolver<Message>(ResolveMessageWinner),
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

         private  IObservable<Message> SuscribeMessage(ResolveFieldContext<object> context){
            return _bingo.Messages(); 
        }

        private Message ResolveMessageWinner(ResolveFieldContext<object> context){
            var message = context.Source as Message; 
            return message; 
        }
    }
}