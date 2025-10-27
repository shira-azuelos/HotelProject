using System.ComponentModel.DataAnnotations;
namespace HotelBooking.Models
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
        public string Tz { get; set; } = string.Empty; //תעודת זהות
        public string FirstName { get; set; } = string.Empty;//שם פרטי 
        public string LastName { get; set; } = string.Empty;//שם משפחה
        public string Phone { get; set; } = string.Empty;//טלפון
        public UserRole Role { get; set; } // תפקיד (Enum)
        public ICollection<Booking> Bookings { get; set; } = new List<Booking>();//רשימת ההזמנות של המשתמש
    }
}
