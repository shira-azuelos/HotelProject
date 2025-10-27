using System.ComponentModel.DataAnnotations;
namespace HotelBooking.Models
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
        [Key]
        public int Id { get; set; }
        public int UserId { get; set; } // מפתח למשתמש שהזמין
        public DateTime CheckInDate { get; set; } // תאריך כניסה
        public DateTime CheckOutDate { get; set; } // תאריך יציאה
        public DateTime BookingDate { get; set; } = DateTime.Now; // מתי ההזמנה בוצעה
        public decimal FinalPrice { get; set; } // מחיר סופי לכל ההזמנה
        public BookingStatus Status { get; set; } // סטטוס ההזמנה
        public User User { get; set; } = default!; //המשתמש שהזמין
        public ICollection<BookingRoom> BookingRooms { get; set; } = new List<BookingRoom>();
    }
}
