using System;
using System.Reactive.Subjects;
using System.Reactive.Linq;

namespace RedCrossBingo.Models
{
   
  
    public class BingoChat : IBingoChat
    {
         private readonly ISubject<BingoNumbers> _stream = new ReplaySubject<BingoNumbers>(1);
          public BingoNumbers AddBingo(BingoNumbers message)
        {
            _stream.OnNext(message);
            return message; 
        }

        public IObservable<BingoNumbers> BingoMessages()
        {
      
            return _stream.AsObservable(); 
        }
       
    }
}