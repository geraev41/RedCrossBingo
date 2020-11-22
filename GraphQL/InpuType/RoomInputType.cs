using GraphQL.Types;
using RedCrossBingo.Models;

namespace  RedCrossBingo.GraphQL.InputType 
{
    class RoomInputType : InputObjectGraphType
    {
        public RoomInputType()
        {
            Name = "RoomInput";
            Field<NonNullGraphType<StringGraphType>>("name");
            Field<NonNullGraphType<StringGraphType>>("url");
            Field<NonNullGraphType<IntGraphType>>("usersId");
        }
    }
}