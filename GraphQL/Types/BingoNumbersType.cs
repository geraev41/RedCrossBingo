using GraphQL.Types;
using RedCrossBingo.Models; 
using RedCrossBingo.Repositories; 

namespace  RedCrossBingo.GraphQL.Types 
{
    class BingoNumbersType : ObjectGraphType<BingoNumbers>
    {
        public BingoNumbersType (RoomsRepository b)
        {
            Name = "Numbers";
            Field(x => x.Id);
            Field(x => x.number);
            Field(x => x.IsChosen);
            Field(x => x.RoomsId);
            Field<RoomsType>(
                 "room",
                 resolve: context => {
                     return b.Find((context.Source.RoomsId));
                 }
            );

        }
    }
}