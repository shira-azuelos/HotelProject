using HotelProject.Core.Repositories;
using HotelProject.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace HotelProject.Data.Repositories
{
    public class RoomsRepository : IRoomsRepository
    {
        private readonly DataContext _context;

        public RoomsRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<List<Room>> GetAllAsync()
        {
            return await _context.Rooms.ToListAsync();
        }

        public async Task<Room> GetByIdAsync(int id)
        {
            return await _context.Rooms.FindAsync(id);
        }

        public void AddRoom(Room room)
        {
            _context.Rooms.Add(room);
        }

        public async Task DeleteByIdAsync(int id)
        {
            var room = await GetByIdAsync(id);
            if (room != null)
            {
                _context.Rooms.Remove(room);
            }
        }

        public async Task UpdateRoomAsync(int id, Room room)
        {
            var roomToUpdate = await _context.Rooms.FindAsync(id);
            if (roomToUpdate != null)
            {
                roomToUpdate.Status = room.Status;
                roomToUpdate.NumberOfBeds = room.NumberOfBeds;
                roomToUpdate.BasePrice = room.BasePrice;
            }
        }

        public async Task UpdateRoomStatusAsync(int id, RoomStatus roomStatus)
        {
            var roomToUpdate = await _context.Rooms.FindAsync(id);
            if (roomToUpdate != null)
            {
                roomToUpdate.Status = roomStatus;
            }
        }

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}