using RedCrossBingo.Models; 
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using GraphQL.Types;

namespace  RedCrossBingo.Repositories
{
    class UserRepository
    {
        private readonly DataBaseContext _context;
        public UserRepository(DataBaseContext context)
        {
            _context = context;
        }

            public Users Login(ResolveFieldContext<object> context,string email, string password){
            var results = from u in _context.Users select u;
            var user = results.SingleOrDefault(x=> x.Email== email && x.Password == password); 
            return user;
        }
        



    }
}