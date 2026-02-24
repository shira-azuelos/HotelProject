using HotelProject.Core.Services;
using HotelProject.Core.Models;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using HotelProject.Core.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using HotelProject.Entities;

namespace HotelProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomsController : ControllerBase
    {
        private readonly IRoomsService _RoomsService;
        private readonly IMapper _mapper;

        public RoomsController(IRoomsService roomService, IMapper mapper)
        {
            _RoomsService = roomService;
            _mapper = mapper;
        }

        // GET: api/<RoomsController>
        [HttpGet]

        public async Task<IEnumerable<RoomDTO>> Get()
        {
            var rooms = await _RoomsService.GetAllAsync();
            return _mapper.Map<List<RoomDTO>>(rooms);
        }

        // GET api/<RoomsController>/5
        [HttpGet("{id}")]

        public async Task<ActionResult> Get(int id)
        {
            var room = await _RoomsService.GetByIdAsync(id);
            if (room == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<RoomDTO>(room)); 
        }

        // POST api/<RoomsController>
        [HttpPost]
        [Authorize(Roles = "admin")]

        public async Task<ActionResult> Post([FromBody] RoomPostModel value)
        {
            var room = _mapper.Map<Room>(value);
            await _RoomsService.AddRoomAsync(room); 
            return Ok();
        }

        // PUT api/<RoomsController>/5/status
        [HttpPut("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult> Put(int id, [FromBody] RoomPutModel value)
        {
            var room = await _RoomsService.GetByIdAsync(id);
            if (room == null)
            {
                return NotFound();
            }
            if (value.NumberOfBeds > 0)
                room.NumberOfBeds = value.NumberOfBeds;

            if (value.BasePrice > 0)
                room.BasePrice = value.BasePrice;

            await _RoomsService.UpdateRoomAsync(id, room);
            return Ok();
        }
        // DELETE api/<RoomsController>/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "admin")]

        public async Task<ActionResult> Delete(int id)
        {
            await _RoomsService.DeleteByIdAsync(id); 
            return Ok();
        }
    }
}
