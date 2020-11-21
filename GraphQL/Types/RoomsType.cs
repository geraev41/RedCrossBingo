using GraphQL.Types;
using RedCrossBingo.Models; 
using RedCrossBingo.Repositories; 

namespace  RedCrossBingo.GraphQL.Types 
{
    class RoomsType : ObjectGraphType<Rooms>
    {
        public RoomsType (RoomsRepository b)
        {
            Name = "rooms";
            Field(x => x.Id);
            Field(x => x.Name);
            Field(x => x.Url);
            Field(x => x.UsersId );
           
            //agregar fild de users
            
            Field<ListGraphType<BingocardsType>>(
                 "roomsCard",
                 resolve: context => {
                     return b.cardsFromRooms((context.Source.Id));
                 }
            );

            Field<ListGraphType<BingoNumbersType>>(
                 "numbersRoom",
                 resolve: context => {
                     return b.numberFromRooms((context.Source.Id));
                 }
            );

        }
    }
}