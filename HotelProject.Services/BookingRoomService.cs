using HotelProject.Core.Models;
using HotelProject.Core.Repositories;
using HotelProject.Core.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HotelProject.Services
{
    public class BookingRoomService : IBookingRoomService
    {
        private readonly IBookingRoomRepository _bookingRoomRepository;

        public BookingRoomService(IBookingRoomRepository bookingRoomRepository)
        {
            _bookingRoomRepository = bookingRoomRepository;
        }

        public async Task<List<BookingRoom>> GetAllAsync()
        {
            return await _bookingRoomRepository.GetAllAsync();
        }

        public async Task<BookingRoom> GetByIdAsync(int id)
        {
            return await _bookingRoomRepository.GetByIdAsync(id);
        }

        public async Task AddBookingRoomAsync(BookingRoom bookingRoom)
        {
            _bookingRoomRepository.AddBookingRoom(bookingRoom);
            await _bookingRoomRepository.SaveAsync();
        }

        public async Task DeleteByIdAsync(int id)
        {
            await _bookingRoomRepository.DeleteByIdAsync(id);
            await _bookingRoomRepository.SaveAsync();
        }
    }
}