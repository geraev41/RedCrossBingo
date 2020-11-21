using RedCrossBingo.Models; 
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using GraphQL.Types;

namespace  RedCrossBingo.Repositories
{
    class BingocardsnumbersRepository
    {
        private readonly DataBaseContext _context;
        public BingocardsnumbersRepository(DataBaseContext context)
        {
            _context = context;
        }

       public IEnumerable<BingoCardNumbers> All(ResolveFieldContext<object> context){
            var results = from cards in _context.BingoCardNumbers select cards;
            return results;
        }

         public BingoCardNumbers Find(long id){
           return  _context.BingoCardNumbers.Find(id); 
        }

         public async Task<BingoCardNumbers> Add(BingoCardNumbers b) {
            _context.BingoCardNumbers.Add(b);
            await _context.SaveChangesAsync();
            return b;
        }

          public IEnumerable<BingoCardNumbers>  GetNumbersForCardBingo(long cardId)
        {
            var results = from cardnumbers in _context.BingoCardNumbers select cardnumbers;
            results = results.Where(c=> c.BingoCardsId == cardId);  
            return results;
        }

        public async Task<BingoCardNumbers> Update(long id, BingoCardNumbers b) {
            b.Id = id;
            var updated = (_context.BingoCardNumbers.Update(b)).Entity;
            if (updated == null)
            {
                return null;
            }
            await _context.SaveChangesAsync();
            return updated;
        }

        public async Task<BingoCardNumbers> Remove(long id) {
            var b = await _context.BingoCardNumbers.FindAsync(id);
            if (b == null)
            {
                return null;
            }
            _context.BingoCardNumbers.Remove(b);
            await _context.SaveChangesAsync();
            return b;
        }

        
    }
}