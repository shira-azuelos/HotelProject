using HotelProject.Core.Repositories;
using HotelProject.Core.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HotelProject.Data.Repositories
{
    public class RoomsRepository : IRoomsRepository
    {
        private readonly DataContext _context;
        public RoomsRepository(DataContext context) => _context = context;

        public async Task<List<Room>> GetAllAsync()
        {
            return await _context.Rooms
                .Include(r => r.BookingRooms)
                .ThenInclude(br => br.Booking) 
                .ToListAsync();
        }

        public async Task<Room> GetByIdAsync(int id)
        {
            return await _context.Rooms
                .Include(r => r.BookingRooms)
                .ThenInclude(br => br.Booking)
                .FirstOrDefaultAsync(r => r.Id == id);
        }

        public void AddRoom(Room room) => _context.Rooms.Add(room);

        public async Task SaveAsync() => await _context.SaveChangesAsync();

        public async Task DeleteByIdAsync(int id)
        {
            var room = await GetByIdAsync(id);
            if (room != null) _context.Rooms.Remove(room);
        }

        public async Task UpdateRoomAsync(int id, Room room)
        {
            var roomToUpdate = await _context.Rooms.FindAsync(id);
            if (roomToUpdate != null)
            {
                roomToUpdate.NumberOfBeds = room.NumberOfBeds;
                roomToUpdate.BasePrice = room.BasePrice;
                roomToUpdate.Status = room.Status;
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
    }
}