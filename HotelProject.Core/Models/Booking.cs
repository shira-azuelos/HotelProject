using System.ComponentModel.DataAnnotations;

namespace HotelProject.Core.Models
{
    public enum BookingStatus
    {
        Pending,//בתהליך
        Confirmed,//מאושר
        Canceled,//בוטל
        Completed //הושלם
    }
    public class Booking
    {
        public int Id { get; set; }
        public int UserId { get; set; } 
        public DateTime CheckInDate { get; set; } 
        public DateTime CheckOutDate { get; set; }
        public DateTime BookingDate { get; set; }
        public double FinalPrice { get; set; } 
        public BookingStatus Status { get; set; }
        public User User { get; set; } = default!; 
        public ICollection<BookingRoom> BookingRooms { get; set; } = new List<BookingRoom>();
    }
}
