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
            int totalNights = (booking.CheckOutDate.Date - booking.CheckInDate.Date).Days;
            if (totalNights <= 0)
            {
                throw new Exception("Check-out date must be after check-in date.");
            }

            var existingBookings = await _bookingRepository.GetAllAsync();
            var isRoomOccupied = existingBookings.Any(b =>
                b.RoomId == booking.RoomId &&
                b.Status == BookingStatus.Confirmed &&
                !(booking.CheckOutDate <= b.CheckInDate || booking.CheckInDate >= b.CheckOutDate));

            if (isRoomOccupied)
            {
                throw new Exception("The room is already booked for the selected dates.");
            }

            var room = await _roomsRepository.GetByIdAsync(booking.RoomId);
            if (room == null) throw new Exception("The requested room does not exist.");

            booking.FinalPrice = totalNights * room.BasePrice;
            booking.BookingDate = DateTime.Now;
            booking.Status = BookingStatus.Confirmed;

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
        public async Task DeleteExpiredBookingsAsync()
        {
            var allBookings = await _bookingRepository.GetAllAsync();

            foreach (var booking in allBookings)
            {
                await _bookingRepository.DeleteByIdAsync(booking.Id);
            }
            await _bookingRepository.SaveAsync();
        }

    }
}