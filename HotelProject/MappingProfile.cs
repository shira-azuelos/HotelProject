using AutoMapper;
using HotelProject.Core.DTOs;
using HotelProject.Core.Models;
using HotelProject.Entities; 
namespace HotelProject.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<BookingPostModel, Booking>();
            CreateMap<Booking, BookingDTO>().ReverseMap();

            CreateMap<Room, RoomDTO>().ReverseMap();
            CreateMap<RoomPostModel, Room>();

            CreateMap<BookingRoom, BookingRoomDTO>().ReverseMap();
            CreateMap<BookingRoomPostModel, BookingRoom>();

            CreateMap<User, UserDTO>().ReverseMap();
        }
    }
}