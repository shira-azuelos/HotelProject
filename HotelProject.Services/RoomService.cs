using HotelProject.Core.Models;
using HotelProject.Core.Repositories;
using HotelProject.Core.Services;
using System.Collections.Generic;
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
            return await _roomsRepository.GetAllAsync();
        }

        public async Task<Room> GetByIdAsync(int id)
        {
            return await _roomsRepository.GetByIdAsync(id);
        }

        public async Task AddRoomAsync(Room room)
        {
            _roomsRepository.AddRoom(room);
            await _roomsRepository.SaveAsync();
        }

        public async Task DeleteByIdAsync(int id)
        {
            await _roomsRepository.DeleteByIdAsync(id);
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
    }
}