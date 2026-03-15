using HotelProject.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HotelProject.Core.Repositories
{
    public interface IUserService
    {
        Task<List<User>> GetAllAsync();

        Task<User> GetByIdAsync(string Tz);

        Task AddUserAsync(User user);

        Task UpdateUserAsync(string tz, User user);

    }
}