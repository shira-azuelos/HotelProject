using HotelProject.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HotelProject.Core.Repositories
{
    public interface IRoomsRepository
    {
        Task<List<Room>> GetAllAsync();
        Task<Room> GetByIdAsync(int id);
        void AddRoom(Room room);
        Task DeleteByIdAsync(int id);
        Task UpdateRoomAsync(int id, Room room);
        Task UpdateRoomStatusAsync(int id, RoomStatus roomStatus);
        Task SaveAsync();
    }
}