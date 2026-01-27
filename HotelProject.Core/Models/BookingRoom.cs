using System.ComponentModel.DataAnnotations;

namespace HotelProject.Core.Models
{
    public class BookingRoom
    {
        public int Id { get; set; }
        public int BookingId { get; set; } 
        public int RoomId { get; set; } 
        public Booking Booking { get; set; } 
        public Room Room { get; set; }
    }
}
