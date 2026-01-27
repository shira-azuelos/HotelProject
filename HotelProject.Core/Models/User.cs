using System.ComponentModel.DataAnnotations;

namespace HotelProject.Core.Models
{
    public enum UserRole
    {
        Client,
        manager
    }
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string Tz { get; set; } 
        public string FirstName { get; set; } 
        public string LastName { get; set; }
        public string Phone { get; set; }
        public UserRole Role { get; set; } 
        public ICollection<Booking> Bookings { get; set; } = new List<Booking>();
    }
}
