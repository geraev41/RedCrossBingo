using GraphQL.Types;
using RedCrossBingo.Models;

namespace  RedCrossBingo.GraphQL.InputType 
{
    class MessageInputType : InputObjectGraphType
    {
        public MessageInputType()
        {
            Name = "MessageInput";
            Field<NonNullGraphType<StringGraphType>>("body");
            Field<NonNullGraphType<BooleanGraphType>>("isWinner");
        }
    }
}
