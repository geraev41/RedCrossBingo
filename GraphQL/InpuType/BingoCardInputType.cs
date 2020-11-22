using GraphQL.Types;
using RedCrossBingo.Models;

namespace  RedCrossBingo.GraphQL.InputType 
{
    class BingoCardInputType : InputObjectGraphType
    {
        public BingoCardInputType()
        {
            Name = "BingoCardInput";
            Field<NonNullGraphType<IntGraphType>>("roomsId");
            Field<NonNullGraphType<BooleanGraphType>>("IsPlaying");
        }
    }
}