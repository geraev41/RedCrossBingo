using GraphQL.Types;
using RedCrossBingo.Repositories;
using RedCrossBingo.GraphQL.Types;

namespace RedCrossBingo.GraphQL{
    class RedCrossBingoQuery : ObjectGraphType
    {
        public RedCrossBingoQuery(BingocardsRepository b, 
        BingocardsnumbersRepository numbersRepo,
        BingonumberRepository bingoNum,
        RoomsRepository rooms,
        UserRepository user
         )
        {
           ShowCards(b); 
           ShowCardsNumbers(numbersRepo); 
           ShowNumbers(bingoNum);
           ShowRooms(rooms);
           GetNumberForTombola(bingoNum); 
           GetRoomForName(rooms); 
           ShowUsers(user);
           Card(b); 
          
        }
      
        private void ShowCards(BingocardsRepository b ){
             Field<ListGraphType<BingocardsType>>("cards",
                resolve: context => {
                return b.All(context);
            });
        }


          private void ShowCardsNumbers(BingocardsnumbersRepository b ){
             Field<ListGraphType<BingocardsnumbersType>>("numbers",
                resolve: context => {
                return b.All(context);
            });
        }

        private void ShowNumbers(BingonumberRepository b ){
             Field<ListGraphType<BingoNumbersType>>("bingoNum",
                resolve: context => {
                return b.All(context);
            });
        }

        private void ShowRooms(RoomsRepository b ){
             Field<ListGraphType<RoomsType>>("roomsRep",
                resolve: context => {
                return b.All(context);
            });
        }
        

        private void GetNumberForTombola(BingonumberRepository b ){
             Field<BingoNumbersType>("getNumber",
                resolve: context => {
                    //Se debe filtrar
                return b.GetNumber(1, 14);
            });
        }

        private void GetRoomForName(RoomsRepository r ){
             Field<RoomsType>("getRoomName",
                arguments: new QueryArguments(
                    new QueryArgument<StringGraphType> { Name = "name" },
                    new QueryArgument<IntGraphType> { Name = "userId" }
                ),
                resolve: context => {
                var userId = context.GetArgument<long>("userId");
                var name = context.GetArgument<string>("name");
                return r.GetRoomName(userId, name);
            });
        }

        private void ShowUsers(UserRepository b ){
            Field<UsersType>("login",
                arguments: new QueryArguments(
                     new QueryArgument<StringGraphType> { Name = "email" },
                     new QueryArgument<StringGraphType> { Name = "password" }
                ),
                resolve: context => {
                    var email = context.GetArgument<string>("email");
                    var password = context.GetArgument<string>("password");
                return b.Login(context,email,password);
            });
        }

        private void Card(BingocardsRepository b ){
             Field<BingocardsType>("card",
                arguments: new QueryArguments(
                     new QueryArgument<NonNullGraphType<IdGraphType>> { Name = "id" }
                ),
                resolve: context => {
                var id = context.GetArgument<long>("id");
                return b.Find(id);
            });
        }

    }
}
