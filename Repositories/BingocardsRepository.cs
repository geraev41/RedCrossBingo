using RedCrossBingo.Models; 
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using GraphQL.Types;

namespace  RedCrossBingo.Repositories
{
    class BingocardsRepository
    {
        private readonly DataBaseContext _context;
        public BingocardsRepository(DataBaseContext context)
        {
            _context = context;
        }

       public IEnumerable<BingoCards> All(ResolveFieldContext<object> context){
            var results = from cards in _context.BingoCards select cards;
          //  results = results.Include(c=> c.BingoCardNumbers); 
            return results;
        }

         public BingoCards Find(long id){
         //  var result = _context.BingoCards.Where(c=> c.Id == id).Include(c=> c.BingoCardNumbers).First(); 
           return  _context.BingoCards.Find(id); 
        }

         public async Task<BingoCards> Add(BingoCards b) {
            _context.BingoCards.Add(b);
            await _context.SaveChangesAsync();
            return b;
        }

          public IEnumerable<BingoCards>  GetCardsForRoom(long roomsId)
        {
            var results = from cards in _context.BingoCards select cards;
            results = results.Where(c=> c.RoomsId == roomsId&& c.IsPlaying == false);  
            return results;
        }

        public async Task<BingoCards> Update(long id, BingoCards b) {
            b.Id = id;
            var updated = (_context.BingoCards.Update(b)).Entity;
            if (updated == null)
            {
                return null;
            }
            await _context.SaveChangesAsync();
            return updated;
        }

        public async Task<BingoCards> Remove(long id) {
            var b = await _context.BingoCards.FindAsync(id);
            if (b == null)
            {
                return null;
            }
            _context.BingoCards.Remove(b);
            await _context.SaveChangesAsync();
            return b;
        }

         public Rooms GetRooms(string nameRoom)
        {
            var room =  _context.Rooms.Where(x => x.Name == nameRoom).First();
            return room; 
        }

    }
}