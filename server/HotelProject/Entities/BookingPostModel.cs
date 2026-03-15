using HotelProject.Core.Models;

namespace HotelProject.Entities
{
    public class BookingPostModel
    {
        public int UserId { get; set; }
        public int RoomId { get; set; }
        public DateTime CheckInDate { get; set; }
        public DateTime CheckOutDate { get; set; }
        public BookingStatus Status { get; set; }
    }
}