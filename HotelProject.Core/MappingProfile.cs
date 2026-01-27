using AutoMapper;
using HotelProject.Core.DTOs;
using HotelProject.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HotelProject.Core
{
    public class MappingProfile:Profile
    {
        public MappingProfile()
        {
            CreateMap<User,UserDTO>().ReverseMap();
            CreateMap<Room, RoomDTO>().ReverseMap();
            CreateMap<BookingRoom, BookingRoomDTO>().ReverseMap();
            CreateMap<Booking, BookingDTO>().ReverseMap();


        }
    }
}
