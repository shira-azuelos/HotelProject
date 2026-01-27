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

        Task<User> GetByIdAsync(int id);

        Task AddUserAsync(User user);

        Task UpdateUserAsync(int id, User user);

    }
}