using GraphQL.Types;
using RedCrossBingo.Repositories;
using RedCrossBingo.GraphQL.Types;
using RedCrossBingo.Models;
using RedCrossBingo.GraphQL.InputType; 

namespace  RedCrossBingo.GraphQL {
    class RedCrossBingoMutation : ObjectGraphType
    {
        public RedCrossBingoMutation(BingocardsRepository bcardRepository, 
        BingocardsnumbersRepository bcardNumberRepository)
        {
            CreateCard(bcardRepository); 
            // Field<AuthorType>("updateAuthor",
            //     arguments: new QueryArguments(
            //         new QueryArgument<NonNullGraphType<IdGraphType>> { Name = "id" },
            //         new QueryArgument<NonNullGraphType<AuthorInputType>> { Name = "input" }
            //     ),
            //     resolve: context => {
            //     var id = context.GetArgument<long>("id");
            //     var author = context.GetArgument<Author>("input");
            //     return authorRepository.Update(id, author);
            // });

         
            // Field<AuthorType>("deleteAuthor",
            //     arguments: new QueryArguments(new QueryArgument<NonNullGraphType<IdGraphType>> { Name = "id" }),
            //     resolve: context => {
            //         return authorRepository.Remove(context.GetArgument<long>("id"));
            // });

            
        }

        private void CreateCard(BingocardsRepository bcardRepository){
            Field<BingocardsType>("createCard",
                arguments: new QueryArguments(new QueryArgument<NonNullGraphType<BingoCardInputType>> { Name = "input" }),
                resolve: context => {
                return bcardRepository.Add(context.GetArgument<BingoCards>("input"));
            });

        }
    }
}