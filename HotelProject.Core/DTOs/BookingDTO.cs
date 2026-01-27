using HotelProject.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HotelProject.Core.DTOs
{
    public class BookingDTO
    {
        public int UserId { get; set; }
        public DateTime CheckInDate { get; set; }
        public DateTime CheckOutDate { get; set; }
        public DateTime BookingDate { get; set; }
        public double FinalPrice { get; set; }
        public BookingStatus Status { get; set; }
    }
}
