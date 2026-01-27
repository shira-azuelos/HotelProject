using HotelProject.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HotelProject.Core.DTOs
{
    public class RoomDTO
    {
        public int RoomNumber { get; set; }
        public RoomStatus Status { get; set; }
        public int NumberOfBeds { get; set; }
        public double BasePrice { get; set; }
        public int Floor { get; set; }
    }
}
