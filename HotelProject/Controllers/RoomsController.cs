using HotelProject.Core.Services;
using HotelProject.Core.Models;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using HotelProject.Core.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

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
        public async Task<ActionResult> Post([FromBody] Room value)
        {
            var room = _mapper.Map<Room>(value);
            await _RoomsService.AddRoomAsync(room); 
            return Ok();
        }

        // PUT api/<RoomsController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] Room value)
        {
            var room = await _RoomsService.GetByIdAsync(id);
            if (room == null)
            {
                return NotFound();
            }
            _mapper.Map(value, room);
            await _RoomsService.UpdateRoomAsync(id, room); 
            return Ok();
        }

        // PUT api/<RoomsController>/5/status
        [HttpPut("{id}/status")]
        public async Task<ActionResult> PutStatus(int id, RoomStatus status)
        {
            await _RoomsService.UpdateRoomStatusAsync(id, status);
            return Ok();
        }

        // DELETE api/<RoomsController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await _RoomsService.DeleteByIdAsync(id); 
            return Ok();
        }
    }
}
