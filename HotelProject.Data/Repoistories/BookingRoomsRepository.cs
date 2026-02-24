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
    public class BookingRoomsRepository : IBookingRoomRepository
    {
        private readonly DataContext _context;

        public BookingRoomsRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<List<BookingRoom>> GetAllAsync()
        {
            return await _context.BookingRooms
                .Include(br => br.Booking)
                .Include(br => br.Room)
                .ToListAsync();
        }

        public async Task<BookingRoom> GetByIdAsync(int id)
        {
            return await _context.BookingRooms.FindAsync(id);
        }

        public void AddBookingRoom(BookingRoom bookingroom)
        {
            _context.BookingRooms.Add(bookingroom);
        }

        public async Task DeleteByIdAsync(int id)
        {
            var bookingRoom = await GetByIdAsync(id);
            if (bookingRoom != null)
            {
                _context.BookingRooms.Remove(bookingRoom);
            }
        }

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}