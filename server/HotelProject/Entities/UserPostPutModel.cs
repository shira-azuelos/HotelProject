using HotelProject.Core.Models;

namespace HotelProject.Entities
{
    public class UserPostPutModel
    {
        public string Tz { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string password {  get; set; }
        public UserRole Role { get; set; }
    }
}
