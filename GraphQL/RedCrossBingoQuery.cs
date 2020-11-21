using GraphQL.Types;
using RedCrossBingo.Repositories;
using RedCrossBingo.GraphQL.Types;

namespace RedCrossBingo.GraphQL{
    class RedCrossBingoQuery : ObjectGraphType
    {
        public RedCrossBingoQuery(BingocardsRepository b, 
        BingocardsnumbersRepository numbersRepo,
        BingonumberRepository bingoNum,
        RoomsRepository rooms
         )
        {
           ShowCards(b); 
           ShowCardsNumbers(numbersRepo); 
           ShowNumbers(bingoNum);
           ShowRooms(rooms);
           getNumberForTombola(bingoNum); 
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
        

        private void getNumberForTombola(BingonumberRepository b ){
             Field<BingoNumbersType>("getNumber",
                resolve: context => {
                return b.GetNumber(1, 14);
            });
        }
    }
}
