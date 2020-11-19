using GraphQL.Types;
using RedCrossBingo.Models; 
using RedCrossBingo.Repositories; 

namespace  RedCrossBingo.GraphQL.Types 
{
    class BingocardsType : ObjectGraphType<BingoCards>
    {
        public BingocardsType (BingocardsnumbersRepository b)
        {
            Name = "Card";
            Field(x => x.Id);
            Field(x => x.RoomsId);
            Field(x => x.IsPlaying);

            Field<ListGraphType<BingocardsnumbersType>>(
                "numbers",
                resolve: context => {
                    return b.GetNumbersForCardBingo(context.Source.Id);
                }
            );

        }
    }
}