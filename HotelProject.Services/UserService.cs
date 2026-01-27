using HotelProject.Core.Models;
using HotelProject.Core.Repositories;
using HotelProject.Core.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HotelProject.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<List<User>> GetAllAsync()
        {
            return await _userRepository.GetAllAsync();
        }

        public async Task<User> GetByIdAsync(int id)
        {
            return await _userRepository.GetByIdAsync(id);
        }

        public async Task AddUserAsync(User user)
        {
            _userRepository.AddUser(user);
            await _userRepository.SaveAsync();
        }

        public async Task UpdateUserAsync(int id, User user)
        {
            await _userRepository.UpdateUserAsync(id, user);
            await _userRepository.SaveAsync();
        }
    }
}