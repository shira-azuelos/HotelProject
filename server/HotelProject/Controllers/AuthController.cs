using HotelProject.Core.Models;
using HotelProject.Core.Services;
using HotelProject.Entities;
using HotelProject.Core.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Student.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IUserService _userService;

        public AuthController(IConfiguration configuration, IUserService userService)
        {
            _configuration = configuration;
            _userService = userService;
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginModel loginModel)
        {
            var us = await _userService.GetByIdAsync(loginModel.Tz);
            if (us == null || us.password != loginModel.password)
            {
                return Unauthorized("פרטי התחברות שגויים");
            }

            string role = (us.FirstName == _configuration["AdminUser:Name"] && us.Tz == _configuration["AdminUser:Tz"]) ? "admin" : "user";
            var claims = new List<Claim>()
    {
        new Claim(ClaimTypes.Name, us.FirstName),
        new Claim(ClaimTypes.NameIdentifier, us.Id.ToString()),
        new Claim(ClaimTypes.Role, role)
    };

            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Key"]));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

            var tokenOptions = new JwtSecurityToken(
                    issuer: _configuration["JWT:Issuer"],
                    audience: _configuration["JWT:Audience"],
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(60),
                    signingCredentials: signinCredentials
            );

            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

            return Ok(new
            {
                Token = tokenString,
                UserId = us.Id,
                userTZ = us.Tz,
                FirstName = us.FirstName,
                Role = role
            });
        }

    }
}
