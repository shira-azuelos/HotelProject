using HotelProject.Core.Services;
using HotelProject.Core.Models;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using HotelProject.Core.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using HotelProject.Entities;
using HotelProject.Services;

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
        [Authorize] 
        public async Task<ActionResult<IEnumerable<BookingDTO>>> Get()
        {
            var bookings = await _BookingService.GetAllAsync();
            var userIdClaim = User.FindFirst("userId")?.Value;
            var userRole = User.FindFirst(System.Security.Claims.ClaimTypes.Role)?.Value;
            if (userRole != "admin" && !string.IsNullOrEmpty(userIdClaim))
            {
                int userId = int.Parse(userIdClaim);
                bookings = bookings.Where(b => b.UserId == userId).ToList();
            }

            if (bookings == null)
            {
                return Ok(new List<BookingDTO>());
            }

            return Ok(_mapper.Map<List<BookingDTO>>(bookings));
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
            try
            {
                var booking = _mapper.Map<Booking>(value);
                await _BookingService.AddBookingAsync(booking);
                return Ok(booking);
            }
            catch (Exception ex)
            {
                string realError = ex.InnerException != null ? ex.InnerException.Message : ex.Message;
                return BadRequest(new { message = realError });
            }
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


        [HttpDelete("cleanup-expired")]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult> CleanupExpired()
        {
            await _BookingService.DeleteExpiredBookingsAsync();
            return Ok(new { message = "All expired bookings have been cleared successfully." });
        }
    }
}
