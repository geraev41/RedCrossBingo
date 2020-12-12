
using GraphQL.Types;
using RedCrossBingo.Models; 
using RedCrossBingo.Repositories; 


namespace  RedCrossBingo.GraphQL.Types 
{
    class MessageType : ObjectGraphType<Message>
    {
        public MessageType ()
        {
            Name = "message";
            Field(x => x.Body);
            Field(x => x.isWinner);
        }
    }
}
