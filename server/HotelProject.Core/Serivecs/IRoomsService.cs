using HotelProject.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HotelProject.Core.Services
{
    public interface IRoomsService
    {
        Task<List<Room>> GetAllAsync();

        Task<Room> GetByIdAsync(int id);

        Task AddRoomAsync(Room room);

        Task DeleteByIdAsync(int id);

        Task UpdateRoomAsync(int id, Room room);

        Task UpdateRoomStatusAsync(int id, RoomStatus roomStatus);
    }
}