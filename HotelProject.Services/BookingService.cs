using HotelProject.Core.Models;
using HotelProject.Core.Repositories;
using HotelProject.Core.Services;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HotelProject.Services
{
    public class BookingService : IBookingService
    {
        private readonly IBookingRepository _bookingRepository;
        private readonly IRoomsRepository _roomsRepository;

        public BookingService(IBookingRepository bookingRepository, IRoomsRepository roomsRepository)
        {
            _bookingRepository = bookingRepository;
            _roomsRepository = roomsRepository;
        }

        public async Task AddBookingAsync(Booking booking)
        {
            int totalNights = (booking.CheckOutDate - booking.CheckInDate).Days;

            if (totalNights <= 0)
            {
                throw new Exception("תאריך היציאה חייב להיות אחרי תאריך הכניסה");
            }
            double pricePerNight = 0;
            booking.BookingDate = DateTime.Now; 
            _bookingRepository.AddBooking(booking);
            await _bookingRepository.SaveAsync();
        }

        public async Task<List<Booking>> GetAllAsync() => await _bookingRepository.GetAllAsync();
        public async Task<Booking> GetByIdAsync(int id) => await _bookingRepository.GetByIdAsync(id);
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