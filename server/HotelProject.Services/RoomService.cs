using HotelProject.Core.Models;
using HotelProject.Core.Repositories;
using HotelProject.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HotelProject.Services
{
    public class RoomService : IRoomsService
    {
        private readonly IRoomsRepository _roomsRepository;

        public RoomService(IRoomsRepository roomsRepository)
        {
            _roomsRepository = roomsRepository;
        }

        public async Task<List<Room>> GetAllAsync()
        {
            var rooms = await _roomsRepository.GetAllAsync();
            var today = DateTime.Today;

            foreach (var room in rooms)
            {
                bool isOccupied = room.BookingRooms != null && room.BookingRooms.Any(br =>
                    br.Booking != null &&
                    br.Booking.Status == BookingStatus.Confirmed &&
                    today >= br.Booking.CheckInDate.Date &&
                    today < br.Booking.CheckOutDate.Date);

                room.Status = isOccupied ? RoomStatus.Occupied : RoomStatus.Available;
            }
            return rooms;
        }

        public async Task<Room> GetByIdAsync(int id) => await _roomsRepository.GetByIdAsync(id);

        public async Task AddRoomAsync(Room room)
        {
            _roomsRepository.AddRoom(room);
            await _roomsRepository.SaveAsync();
        }

        public async Task UpdateRoomAsync(int id, Room room)
        {
            await _roomsRepository.UpdateRoomAsync(id, room);
            await _roomsRepository.SaveAsync();
        }
        public async Task UpdateRoomStatusAsync(int id, RoomStatus roomStatus)
        {
            await _roomsRepository.UpdateRoomStatusAsync(id, roomStatus);
            await _roomsRepository.SaveAsync();
        }

        public async Task DeleteByIdAsync(int id)
        {
            await _roomsRepository.DeleteByIdAsync(id);
            await _roomsRepository.SaveAsync();
        }
    }
}