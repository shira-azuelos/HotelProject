using System.ComponentModel.DataAnnotations;
namespace HotelBooking.Models
{
    public enum RoomStatus
    {
        Available,
        Occupied
    }
    public enum RoomType
    {
        Single,     // חדר יחיד
        Double,     // חדר זוגי 
        Suite,      // סוויטה
    }
    public class Room
    {
        [Key]
        public int Id { get; set; }
        public RoomType Type { get; set; }
        public int RoomNumber { get; set; } // מס' חדר
        public RoomStatus Status { get; set; } // סטטוס (Enum)
        public int NumberOfBeds { get; set; } // מס' מיטות
        public decimal BasePrice { get; set; } // מחיר לחדר ללילה
        public int Floor { get; set; } // קומה
        public ICollection<BookingRoom> BookingRooms { get; set; } = new List<BookingRoom>();
    }
}
