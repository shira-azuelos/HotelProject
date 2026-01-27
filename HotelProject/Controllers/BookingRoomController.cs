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
    public class BookingRoomController : ControllerBase
    {
        private readonly IBookingRoomService _BookingRoomService;
        private readonly IMapper _mapper;

        public BookingRoomController(IBookingRoomService bookingroomService, IMapper mapper)
        {
            _BookingRoomService = bookingroomService;
            _mapper = mapper;
        }

        // GET: api/<BookingRoomController>
        [HttpGet]
        public async Task<IEnumerable<BookingRoomDTO>> Get()
        {
            var bookingRooms = await _BookingRoomService.GetAllAsync();
            return _mapper.Map<List<BookingRoomDTO>>(bookingRooms);
        }

        // GET api/<BookingRoomController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            var bookingRoom = await _BookingRoomService.GetByIdAsync(id);
            if (bookingRoom == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<BookingRoomDTO>(bookingRoom)); 
        }

        // POST api/<BookingRoomController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] BookingRoom value)
        {
            var bookingRoom = _mapper.Map<BookingRoom>(value);
            await _BookingRoomService.AddBookingRoomAsync(bookingRoom);
            return Ok(value);
        }

        // DELETE api/<BookingRoomController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await _BookingRoomService.DeleteByIdAsync(id); 
            return Ok();
        }
    }
}
