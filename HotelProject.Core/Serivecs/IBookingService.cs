using HotelProject.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HotelProject.Core.Services
{
    public interface IBookingService
    {
        Task<List<Booking>> GetAllAsync();
        Task<Booking> GetByIdAsync(int id);
        Task AddBookingAsync(Booking booking);
        Task DeleteByIdAsync(int id);
        Task UpdateStatusAsync(int id, BookingStatus status);
    }
}