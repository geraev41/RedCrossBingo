using System;
namespace RedCrossBingo.Models
{
    interface IBingoChat
    {
        BingoNumbers AddBingo(BingoNumbers message);

        IObservable<BingoNumbers> BingoMessages();
    }
}