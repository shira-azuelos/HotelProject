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

            CreateMap<Booking, BookingDTO>()
                .ForMember(dest => dest.GuestName, opt => opt.MapFrom(src =>
                    src.User != null ? $"{src.User.FirstName} {src.User.LastName}" : "Unknown Guest"))
                .ReverseMap();

            CreateMap<Room, RoomDTO>().ReverseMap();
            CreateMap<RoomPostModel, Room>();

            CreateMap<UserPostPutModel, User>();
            CreateMap<User, UserDTO>().ReverseMap();

            CreateMap<BookingRoom, BookingRoomDTO>().ReverseMap();
            CreateMap<BookingRoomPostModel, BookingRoom>();
        }
    }
}