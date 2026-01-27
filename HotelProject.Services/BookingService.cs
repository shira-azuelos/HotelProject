using HotelProject.Core.Models;
using HotelProject.Core.Repositories;
using HotelProject.Core.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HotelProject.Services
{
    public class BookingService : IBookingService
    {
        private readonly IBookingRepository _bookingRepository;

        public BookingService(IBookingRepository bookingRepository)
        {
            _bookingRepository = bookingRepository;
        }

        public async Task<List<Booking>> GetAllAsync()
        {
            return await _bookingRepository.GetAllAsync();
        }

        public async Task<Booking> GetByIdAsync(int id)
        {
            return await _bookingRepository.GetByIdAsync(id);
        }

        public async Task AddBookingAsync(Booking booking)
        {
            _bookingRepository.AddBooking(booking);
            await _bookingRepository.SaveAsync();
        }

        public async Task DeleteByIdAsync(int id)
        {
            await _bookingRepository.DeleteByIdAsync(id);
            await _bookingRepository.SaveAsync();
        }

        public async Task UpdateStatusAsync(int id, BookingStatus status)
        {
            await _bookingRepository.UpdateStatusAsync(id, status);
            await _bookingRepository.SaveAsync();
        }
    }
}