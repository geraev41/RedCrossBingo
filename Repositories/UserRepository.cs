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


    }
}