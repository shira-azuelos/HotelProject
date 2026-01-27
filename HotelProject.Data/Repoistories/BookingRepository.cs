using HotelProject.Core.Repositories;
using HotelProject.Core.Models;
using HotelProject.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;
using Microsoft.EntityFrameworkCore;

namespace HotelProject.Data.Repositories
{
    public class BookingRepository : IBookingRepository
    {
        private readonly DataContext _context;
        public BookingRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<List<Booking>> GetAllAsync()
        {
            return await _context.Bookings.ToListAsync();
        }

        public async Task<Booking> GetByIdAsync(int id)
        {
            return await _context.Bookings.FindAsync(id);
        }
        public void AddBooking(Booking booking)
        {
            _context.Bookings.Add(booking);

        }
        public async Task DeleteByIdAsync(int id)
        {
            Booking book = await GetByIdAsync(id);
            _context.Bookings.Remove(book);
        }
        public async Task UpdateStatusAsync(int id, BookingStatus value)
        {
            var bookingToUpdate = await _context.Bookings.FindAsync(id);
            bookingToUpdate.Status = value;
        }
        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }

    }
}

