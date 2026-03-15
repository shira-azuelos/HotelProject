using HotelProject.Core.Repositories;
using HotelProject.Core.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace HotelProject.Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;

        public UserRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<List<User>> GetAllAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User> GetByIdAsync(string Tz)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Tz == Tz);
        }

        public void AddUser(User user)
        {
            _context.Users.Add(user);
        }

        public async Task UpdateUserAsync(string tz, User value)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Tz == tz);

            if (user != null)
            {
                user.Tz = value.Tz;
                user.FirstName = value.FirstName;
                user.LastName = value.LastName;
                user.Phone = value.Phone;
                user.Role = value.Role;
            }
        }

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}