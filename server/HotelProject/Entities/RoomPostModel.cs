using HotelProject.Core.Models;

namespace HotelProject.Entities
{
    public class RoomPostModel
    {
        public int RoomNumber { get; set; }
        public RoomStatus Status { get; set; }
        public int NumberOfBeds { get; set; }
        public double BasePrice { get; set; }
        public int Floor { get; set; }
    }
}
