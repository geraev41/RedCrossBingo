using GraphQL.Types;

namespace  RedCrossBingo.GraphQL.InputType 
{
    class BingoCardNumbersInputType : InputObjectGraphType
    {
        public BingoCardNumbersInputType()
        {
            Name = "BingoCardNumbersInput";
            Field<NonNullGraphType<IntGraphType>>("number");
            Field<NonNullGraphType<BooleanGraphType>>("isSelected");
            Field<NonNullGraphType<IntGraphType>>("bingoCardsId");
        }
    }
}