using GraphQL.Types;
using RedCrossBingo.Models; 
using RedCrossBingo.Repositories; 

namespace  RedCrossBingo.GraphQL.Types 
{
    class UsersType : ObjectGraphType<Users>
    {
        public UsersType (UserRepository b)
        {
            Name = "users";
            Field(x => x.Id);
            Field(x => x.Email);
            Field(x => x.Password);
        }
    }
}