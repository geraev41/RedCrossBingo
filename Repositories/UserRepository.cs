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

            public IEnumerable<Users> All(ResolveFieldContext<object> context,string email, string password){
            var results = from u in _context.Users select u;
            results = results.Where(a => a.Email== email && a.Password== password); 
            if (context.HasArgument("email"))
            {
                var value = context.GetArgument<string>("email");
                results = results.Where(a => a.Email.Contains(value));
            }
            
            if (context.HasArgument("password"))
            {
                var value = context.GetArgument<string>("password");
                results = results.Where(a => a.Password == value);
            }
            
            return results;
        }
        

        public IEnumerable<Users> Login(string email, string password){
            var results = from u in _context.Users select u;
            results = results.Where(a => a.Email== email && a.Password== password); 
            return results;
        }


    }
}