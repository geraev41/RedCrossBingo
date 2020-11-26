using GraphQL.Types;
using RedCrossBingo.Models;

namespace  RedCrossBingo.GraphQL.InputType 
{
    class UserInputType : InputObjectGraphType
    {
        public UserInputType()
        {
            Name = "UserInput";
            Field<NonNullGraphType<StringGraphType>>("email");
            Field<NonNullGraphType<StringGraphType>>("password");
        }
    }
}
