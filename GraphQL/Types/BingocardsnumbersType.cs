using GraphQL.Types;
using RedCrossBingo.Models; 
using RedCrossBingo.Repositories; 

namespace  RedCrossBingo.GraphQL.Types 
{
    class BingocardsnumbersType : ObjectGraphType<BingoCardNumbers>
    {
        public BingocardsnumbersType (BingocardsRepository b)
        {
            Name = "NumbersCard";
            Field(x => x.Id);
            Field(x => x.number);
            Field(x => x.IsSelected);
            Field(x=> x.BingoCardsId); 
            Field<BingocardsType>(
                "card",
                resolve: context => {
                    return b.Find(context.Source.BingoCardsId);
                }
            );
        }
    }
}