using GraphQL.Types;
using RedCrossBingo.Models; 
using RedCrossBingo.Repositories; 

namespace  RedCrossBingo.GraphQL.Types 
{
    class BingoNumbersType : ObjectGraphType<BingoNumbers>
    {
        public BingoNumbersType (BingonumberRepository b)
        {
            Name = "Numbers";
            Field(x => x.Id);
            Field(x => x.number);
            Field(x => x.IsChosen);
            Field(x => x.RoomsId);
            Field<ListGraphType<RoomsType>>(
                 "rooms",
                 resolve: context => {
                     return b.numberFromRooms((context.Source.RoomsId));
                 }
            );

        }
    }
}