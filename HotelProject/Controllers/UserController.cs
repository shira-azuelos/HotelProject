using HotelProject.Core.Models;
using HotelProject.Core.Services;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using HotelProject.Core.DTOs;
using HotelProject.Entities;
using HotelProject.Core.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace HotelProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;

        public UserController(IUserService userService, IMapper mapper)
        {
            _userService = userService;
            _mapper = mapper;
        }

        // GET: api/<UserController>
        [HttpGet]
        [Authorize(Roles = "admin")]

        public async Task<List<UserDTO>> Get()
        {
            var users = await _userService.GetAllAsync();
            return _mapper.Map<List<UserDTO>>(users);
        }

        // GET api/<UserController>/{tz}
        [HttpGet("{tz}")]
        [Authorize(Roles = "admin")]

        public async Task<ActionResult<UserDTO>> Get(string tz)
        {
            var user = await _userService.GetByIdAsync(tz);
            if (user == null)
            {
                return NotFound();
            }
            return _mapper.Map<UserDTO>(user);
        }

        // POST api/<UserController>
        [HttpPost]

        public async Task<ActionResult> Post([FromBody] UserPostPutModel value)
        {
            var user = _mapper.Map<User>(value);
            await _userService.AddUserAsync(user);
            return Ok();
        }

        // PUT api/<UserController>/{tz}
        [HttpPut("{tz}")]
        [Authorize] 
        public async Task<ActionResult> Put(string tz, [FromBody] UserPostPutModel value)
        {
            var user = await _userService.GetByIdAsync(tz);
            if (user == null)
            {
                return NotFound();
            }
            if (!string.IsNullOrEmpty(value.FirstName))
                user.FirstName = value.FirstName;
            if (!string.IsNullOrEmpty(value.LastName))
                user.LastName = value.LastName;
            if (!string.IsNullOrEmpty(value.Phone))
                user.Phone = value.Phone;
            if (!string.IsNullOrEmpty(value.password))
                user.password = value.password;
            await _userService.UpdateUserAsync(tz, user);
            return Ok();
        }
    }
}