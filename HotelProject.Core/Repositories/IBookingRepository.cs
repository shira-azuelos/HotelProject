using HotelProject.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HotelProject.Core.Repositories
{
    public interface IBookingRepository
    {
        public Task<List<Booking>> GetAllAsync();
        public Task<Booking> GetByIdAsync(int id);
        public void AddBooking(Booking booking);
        public Task DeleteByIdAsync(int id);
        public Task UpdateStatusAsync(int id, BookingStatus status);
        public Task SaveAsync();

    }
}
