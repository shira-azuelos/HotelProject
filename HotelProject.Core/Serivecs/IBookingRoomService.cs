using HotelProject.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HotelProject.Core.Services
{
    public interface IBookingRoomService
    {
        Task<List<BookingRoom>> GetAllAsync();
        Task<BookingRoom> GetByIdAsync(int id);
        Task AddBookingRoomAsync(BookingRoom bookingRoom);
        Task DeleteByIdAsync(int id);
    }
}