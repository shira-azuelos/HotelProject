using HotelProject.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HotelProject.Core.Repositories
{
    public interface IBookingRoomRepository
    {
        Task<List<BookingRoom>> GetAllAsync();
        Task<BookingRoom> GetByIdAsync(int id);
        void AddBookingRoom(BookingRoom bookingRoom);
        Task DeleteByIdAsync(int id);
        Task SaveAsync();
    }
}