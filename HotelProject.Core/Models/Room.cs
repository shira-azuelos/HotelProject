using System.ComponentModel.DataAnnotations;

namespace HotelProject.Core.Models
{
    public enum RoomStatus
    {
        Available,
        Occupied
    }
 
    public class Room
    {
        public int Id { get; set; }
        public int RoomNumber { get; set; }
        public RoomStatus Status { get; set; } 
        public int NumberOfBeds { get; set; } 
        public double BasePrice { get; set; } 
        public int Floor { get; set; }
        public ICollection<BookingRoom> BookingRooms { get; set; } = new List<BookingRoom>();
    }
}
