using RedCrossBingo.Models; 
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using GraphQL.Types;
using System;

namespace  RedCrossBingo.Repositories
{
    class BingonumberRepository
    {
        private readonly DataBaseContext _context;
        public BingonumberRepository(DataBaseContext context)
        {
            _context = context;
        }

        public IEnumerable<BingoNumbers> All(ResolveFieldContext<object> context, long roomsId){
            var results = from numbers in _context.BingoNumbers select numbers; 
            results = results.Where( r=> r.RoomsId==roomsId); 
            return results;
        }

        public IEnumerable<BingoNumbers> AllNumberTrue(ResolveFieldContext<object> context, long roomsId){
            var results = from numbers in _context.BingoNumbers select numbers; 
            results = results.Where( r=> r.IsChosen == true && r.RoomsId==roomsId);     
            return results;
        }

        public BingoNumbers NumberFalse(long number, long roomsId){                    
            var results = from numbers in _context.BingoNumbers select numbers; 
            var bingo = results.SingleOrDefault(x=> x.number==number && x.IsChosen==false && x.RoomsId==roomsId);    
            return bingo;           
        }

 



        public BingoNumbers Find(long id){
           return  _context.BingoNumbers.Find(id); 
        }

        public async Task<BingoNumbers> Add(BingoNumbers b) {
            _context.BingoNumbers.Add(b);
            await _context.SaveChangesAsync();
            return b;
        }

        public IEnumerable<Rooms> numberFromRooms(long numberId){
            var results = from rooms in _context.Rooms select rooms;
            results = results.Where(a => a.Id == numberId); 
            return results;
        }

        public IEnumerable<BingoNumbers>  existRoom(int roomsId)
        {
            var results = from numbers in _context.BingoNumbers select numbers;
            results = results.Where(r=> r.RoomsId == roomsId);  
            return results;
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