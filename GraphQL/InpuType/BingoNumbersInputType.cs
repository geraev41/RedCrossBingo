using GraphQL.Types;
using RedCrossBingo.Models;

namespace  RedCrossBingo.GraphQL.InputType 
{
    class BingoNumbersInputType : InputObjectGraphType
    {
        public BingoNumbersInputType()
        {
            Name = "BingoNumbersInput";
            Field<NonNullGraphType<IntGraphType>>("number");
            Field<NonNullGraphType<BooleanGraphType>>("isChosen");
            Field<NonNullGraphType<IntGraphType>>("roomsId");
        }
    }
}