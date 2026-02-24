using HotelProject.Core.Models;
using HotelProject.Core.Repositories;
using HotelProject.Core.Services;

namespace HotelProject.Services
{
    public class BookingRoomService : IBookingRoomService
    {
        private readonly IBookingRoomRepository _bookingRoomRepository;
        private readonly IBookingRepository _bookingRepository;
        private readonly IRoomsRepository _roomsRepository;

        public BookingRoomService(IBookingRoomRepository bookingRoomRepository, IBookingRepository bookingRepository, IRoomsRepository roomsRepository)
        {
            _bookingRoomRepository = bookingRoomRepository;
            _bookingRepository = bookingRepository;
            _roomsRepository = roomsRepository;
        }

        public async Task AddBookingRoomAsync(BookingRoom bookingRoom)
        {
            var currentBooking = await _bookingRepository.GetByIdAsync(bookingRoom.BookingId);
            var room = await _roomsRepository.GetByIdAsync(bookingRoom.RoomId);

            if (currentBooking == null || room == null)
                throw new Exception("נתוני הזמנה או חדר חסרים");

            var all = await _bookingRoomRepository.GetAllAsync();
            if (all.Any(br => br.RoomId == bookingRoom.RoomId &&
                currentBooking.CheckInDate < br.Booking.CheckOutDate &&
                currentBooking.CheckOutDate > br.Booking.CheckInDate))
            {
                throw new Exception("החדר תפוס בתאריכים אלו");
            }
            int nights = (currentBooking.CheckOutDate - currentBooking.CheckInDate).Days;
            if (nights <= 0) nights = 1;
            currentBooking.FinalPrice += (nights * room.BasePrice);

            _bookingRoomRepository.AddBookingRoom(bookingRoom);
            await _bookingRoomRepository.SaveAsync();
            await _bookingRepository.SaveAsync();
        }

        public async Task<List<BookingRoom>> GetAllAsync() => await _bookingRoomRepository.GetAllAsync();
        public async Task<BookingRoom> GetByIdAsync(int id) => await _bookingRoomRepository.GetByIdAsync(id);
        public async Task DeleteByIdAsync(int id)
        {
            var bookingRoom = await _bookingRoomRepository.GetByIdAsync(id);

            if (bookingRoom != null)
            {
                var currentBooking = await _bookingRepository.GetByIdAsync(bookingRoom.BookingId);
                var room = await _roomsRepository.GetByIdAsync(bookingRoom.RoomId);

                if (currentBooking != null && room != null)
                {
                    int nights = (currentBooking.CheckOutDate.Date - currentBooking.CheckInDate.Date).Days;
                    if (nights <= 0) nights = 1;
                    currentBooking.FinalPrice -= (nights * room.BasePrice);
                    if (currentBooking.FinalPrice < 0) currentBooking.FinalPrice = 0;
                }
                await _bookingRoomRepository.DeleteByIdAsync(id);
                await _bookingRoomRepository.SaveAsync();
                await _bookingRepository.SaveAsync();
            }
        }
    }
}