using System.ComponentModel.DataAnnotations;
namespace HotelBooking.Models
{
    public class BookingRoom
    {
        [Key]
        public int Id { get; set; }
        public int BookingId { get; set; } // מפתח למס' הזמנה
        public int RoomId { get; set; } // מפתח למס' חדר
        public Booking Booking { get; set; } = default!;
        public Room Room { get; set; } = default!;
    }
}
