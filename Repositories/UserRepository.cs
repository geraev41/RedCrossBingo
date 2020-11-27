using RedCrossBingo.Models; 
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using GraphQL.Types;
using  Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System; 


namespace  RedCrossBingo.Repositories
{
    class UserRepository
    {
        private readonly DataBaseContext _context;
        public UserRepository(DataBaseContext context)
        {
            _context = context;
        }

            public Users Login(ResolveFieldContext<object> context,string email, string password){
            var results = from u in _context.Users select u;
            var user = results.SingleOrDefault(x=> x.Email== email && x.Password == password); 
            if(user == null){
                return user; 
            }
            user.Token = CreateToken(user); 
            return user;
        }
        

         private string CreateToken(Users user){
            string token = "";
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"));
            var signingCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256); 

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim("password", user.Password.ToString()),
                new Claim("email",user.Email.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            var tokenOptions = new JwtSecurityToken(
                issuer : "https://localhost:5001",
                audience: "https://localhost:5001",
                claims : claims,
                expires: DateTime.Now.AddMinutes(1),
                signingCredentials: signingCredentials
            );
            token = new JwtSecurityTokenHandler().WriteToken(tokenOptions); 
            return token;  
        }


    }
}