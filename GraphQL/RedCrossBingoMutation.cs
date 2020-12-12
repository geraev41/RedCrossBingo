using GraphQL.Types;
using RedCrossBingo.Repositories;
using RedCrossBingo.GraphQL.Types;
using RedCrossBingo.Models;
using RedCrossBingo.GraphQL.InputType; 

namespace  RedCrossBingo.GraphQL {
    class RedCrossBingoMutation : ObjectGraphType
    {
        public RedCrossBingoMutation(BingocardsRepository bcardRepository, 
        BingocardsnumbersRepository bcardNumberRepository,
        RoomsRepository roomsRepository,
        BingonumberRepository bnumberRepository,
        IBingoChat _chatBingo
        )
        {
            CreateRoom(roomsRepository); 
            CreateCard(bcardRepository);
            CreateBingoCardNumber(bcardNumberRepository);  
            UpdateNumber(bcardNumberRepository); 
            DeleteRoom(roomsRepository); 
            CreateBingoNumber(bnumberRepository);
            UpdateBingoNumber(bnumberRepository);
            SendBingo(_chatBingo); 
            SendMessageWinner(_chatBingo); 
        }

        private void CreateRoom(RoomsRepository roomRepository){
            Field<RoomsType>("createRoom",
                arguments: new QueryArguments(new QueryArgument<NonNullGraphType<RoomInputType>> { Name = "input" }),
                resolve: context => {
                return roomRepository.Add(context.GetArgument<Rooms>("input"));
            });

        }
        private void CreateCard(BingocardsRepository bcardRepository){
            Field<BingocardsType>("createCard",
                arguments: new QueryArguments(new QueryArgument<NonNullGraphType<BingoCardInputType>> { Name = "input" }),
                resolve: context => {
                return bcardRepository.Add(context.GetArgument<BingoCards>("input"));
            });

        }

        private void CreateBingoCardNumber(BingocardsnumbersRepository bcardNumberRepository){
            Field<BingocardsnumbersType>("createNumber",
                arguments: new QueryArguments(new QueryArgument<NonNullGraphType<BingoCardNumbersInputType>> { Name = "input" }),
                resolve: context => {
                return bcardNumberRepository.Add(context.GetArgument<BingoCardNumbers>("input"));
            });

        }

        private void CreateBingoNumber(BingonumberRepository bingonumberRepository){
            Field<BingoNumbersType>("createBingoNumber",
                arguments: new QueryArguments(new QueryArgument<NonNullGraphType<BingoNumbersInputType>> { Name = "input" }),
                resolve: context => {
                return bingonumberRepository.Add(context.GetArgument<BingoNumbers>("input"));
            });

        }

        private void UpdateNumber(BingocardsnumbersRepository b){
            Field<BingocardsnumbersType>("updateNumber",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<IdGraphType>> { Name = "id" },
                    new QueryArgument<NonNullGraphType<BingoCardNumbersInputType>> { Name = "input" }
                ),
                resolve: context => {
                var id = context.GetArgument<long>("id");
                var number = context.GetArgument<BingoCardNumbers>("input");
                return b.Update(id, number);
            });
        }


        private void DeleteRoom(RoomsRepository r){
            Field<RoomsType>("deleteRoom",
                arguments: new QueryArguments(new QueryArgument<NonNullGraphType<IdGraphType>> { Name = "id" }),
                resolve: context => {
                    return r.Remove(context.GetArgument<long>("id"));
            });
        }

       
        private void UpdateBingoNumber(BingonumberRepository b){
            Field<BingoNumbersType>("updateBingoNumber",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<IdGraphType>> { Name = "id" },
                    new QueryArgument<NonNullGraphType<BingoNumbersInputType>> { Name = "input" }
                ),
                resolve: context => {
                var id = context.GetArgument<long>("id");
                var isChosen = context.GetArgument<BingoNumbers>("input");
                return b.Update(id, isChosen);
            });
        }

         private void SendBingo (IBingoChat bingo){
            Field<BingoNumbersType>("sendBingoMessage",
                arguments: new QueryArguments(new QueryArgument <NonNullGraphType<BingoNumbersInputType>> { Name = "message" }),
                resolve: context => {
                    return bingo.AddBingo(context.GetArgument<BingoNumbers>("message"));
            });
        }

        private void SendMessageWinner(IBingoChat bingo){
            Field<MessageType>("sendMessageWinner",
                arguments: new QueryArguments(new QueryArgument <NonNullGraphType<MessageInputType>> { Name = "message" }),
                resolve: context => {
                    return bingo.AddNewMessage(context.GetArgument<Message>("message"));
            });
        }

    }
}