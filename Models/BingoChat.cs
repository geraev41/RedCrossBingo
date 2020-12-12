using System;
using System.Reactive.Subjects;
using System.Reactive.Linq;

namespace RedCrossBingo.Models
{
   
  
    public class BingoChat : IBingoChat
    {
         private readonly ISubject<BingoNumbers> _stream = new ReplaySubject<BingoNumbers>(0);
         private readonly ISubject<Message> _Messages = new ReplaySubject<Message>(0);

         public BingoNumbers AddBingo(BingoNumbers message)
        {
            _stream.OnNext(message);
            return message; 
        }

        public IObservable<BingoNumbers> BingoMessages()
        {
            return _stream.AsObservable(); 
        }


        
        public Message AddNewMessage(Message message)
        {
            _Messages.OnNext(message);

            return message; 
        }

        public IObservable<Message> Messages()
        {
      
            return _Messages.AsObservable(); 
        }
       
    }
}