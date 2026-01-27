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

        public async Task<User> GetByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public void AddUser(User user)
        {
            _context.Users.Add(user);
        }

        public async Task UpdateUserAsync(int id, User value)
        {
            var user = await _context.Users.FindAsync(id);

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