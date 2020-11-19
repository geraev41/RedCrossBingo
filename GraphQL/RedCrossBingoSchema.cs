using GraphQL;
using GraphQL.Types;

namespace  RedCrossBingo.GraphQL {
    class RedCrossBingoSchema : Schema
    {
        public RedCrossBingoSchema(IDependencyResolver resolver) : base(resolver)
        {
            Query = resolver.Resolve<RedCrossBingoQuery>(); 
          //  Mutation = resolver.Resolve<BookstoreMutation>(); 
        }
    }
}