using RedCrossBingo.Models; 
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using GraphQL.Types;

namespace  RedCrossBingo.Repositories
{
    class BingonumberRepository
    {
        private readonly DataBaseContext _context;
        public BingonumberRepository(DataBaseContext context)
        {
            _context = context;
        }

        public IEnumerable<BingoNumbers> All(ResolveFieldContext<object> context){
            var results = from numbers in _context.BingoNumbers select numbers;
            return results;
        }

        public BingoNumbers Find(long id){
           return  _context.BingoNumbers.Find(id); 
        }

        public async Task<BingoNumbers> Add(BingoNumbers b) {
            _context.BingoNumbers.Add(b);
            await _context.SaveChangesAsync();
            return b;
        }

          public IEnumerable<BingoNumbers>  GetNumberTrue(bool isChoose)
        {
            var results = from numbers in _context.BingoNumbers select numbers;
            results = results.Where( r=> r.IsChosen == isChoose);  
            return results;
        }

        public IEnumerable<BingoNumbers>  existRoom(int roomsId)
        {
            var results = from numbers in _context.BingoNumbers select numbers;
            results = results.Where(r=> r.RoomsId == roomsId);  
            return results;
        }

        public IEnumerable<BingoNumbers> GetNumber(long roomsId, long number)
        {
            var results = from numbers in _context.BingoNumbers select numbers;
            //var bingo= new BingoNumbers();
            var bingo= _context.BingoNumbers.Find(x=>x.RoomsId==roomsId && x.Number==number); 
            // foreach (var cr in cards.Where(e => e.RoomsId == roomsId && e.number==number))
            // {
            //     bingo.Id = cr.Id;
            //     bingo.number= cr.number;
            //     bingo.RoomsId = cr.RoomsId;               
            // }
            
           return bingo;
        }

  public async Task<BingoNumbers> Update(long id, BingoNumbers b) {
            b.Id = id;
            var updated = (_context.BingoNumbers.Update(b)).Entity;
            if (updated == null)
            {
                return null;
            }
            await _context.SaveChangesAsync();
            return updated;
        }

        public async Task<BingoNumbers> Remove(long id) {
            var b = await _context.BingoNumbers.FindAsync(id);
            if (b == null)
            {
                return null;
            }
            _context.BingoNumbers.Remove(b);
            await _context.SaveChangesAsync();
            return b;
        }


    }
}