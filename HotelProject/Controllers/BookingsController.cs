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
    public class BookingsController : ControllerBase
    {
        private readonly IBookingService _BookingService;
        private readonly IMapper _mapper;

        public BookingsController(IBookingService bookingService, IMapper mapper)
        {
            _BookingService = bookingService;
            _mapper = mapper;
        }

        // GET: api/<BookingsController>
        [HttpGet]
        [Authorize(Roles = "admin")]

        public async Task<IEnumerable<BookingDTO>> Get()
        {
            var bookings = await _BookingService.GetAllAsync();
            return _mapper.Map<List<BookingDTO>>(bookings);
        }

        // GET api/<BookingsController>/5
        [HttpGet("{id}")]
        [Authorize(Roles = "admin")]

        public async Task<ActionResult> Get(int id)
        {
            var booking = await _BookingService.GetByIdAsync(id);
            if (booking == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<BookingDTO>(booking));
        }

        // POST api/<BookingsController>
        [HttpPost]
        [Authorize]

        public async Task<ActionResult> Post([FromBody] BookingPostModel value)
        {
            var booking = _mapper.Map<Booking>(value);
            await _BookingService.AddBookingAsync(booking);
            return Ok(value);
        }

        // PUT: api/<BookingsController>/5/status
        [HttpPut("{id}/status")]
        [Authorize(Roles = "admin")]

        public async Task<ActionResult> PutStatus(int id, BookingPutStatusModel newStatus)
        {
            await _BookingService.UpdateStatusAsync(id, newStatus.Status); 
            return Ok();
        }

        // DELETE api/<BookingsController>/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "admin")]

        public async Task<ActionResult> Delete(int id)
        {
            await _BookingService.DeleteByIdAsync(id); 
            return Ok();
        }
    }
}
