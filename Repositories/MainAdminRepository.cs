using RedCrossBingo.Models; 
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using GraphQL.Types;

namespace  RedCrossBingo.Repositories
{
    class MainAdminRepository
    {
        private readonly DataBaseContext _context;
        public MainAdminRepository(DataBaseContext context)
        {
            _context = context;
        }


    }
}