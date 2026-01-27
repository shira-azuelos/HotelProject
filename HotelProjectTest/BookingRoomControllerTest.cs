using System;
using System.Collections.Generic;
using System.Linq;
using HotelProject.Controllers;
using HotelProject.Core.Models;
using Microsoft.AspNetCore.Mvc;
using Xunit;

namespace HotelProjectTest
{
    public class BookingRoomControllerTest
    {
        //[Fact]
        //public void Get_ReturnList()
        //{
        //    var controller = new BookingRoomController();
        //    var result = controller.Get();
        //    Assert.IsType<List<BookingRoom>>(result);
        //}

        //[Fact]
        //public void GetById_ReturnOk()
        //{
        //    var id = 1;
        //    var controller = new BookingRoomController();
        //    var result = controller.Get(id);
        //    Assert.IsType<OkObjectResult>(result);
        //    var okResult = Assert.IsType<OkObjectResult>(result);
        //    var bookingRoom = Assert.IsType<BookingRoom>(okResult.Value);
        //    Assert.Equal(id, bookingRoom.Id);
        //}

        //[Fact]
        //public void GetById_ReturnNotFound()
        //{
        //    var id = 999;
        //    var controller = new BookingRoomController();
        //    var result = controller.Get(id);
        //    Assert.IsType<NotFoundResult>(result);
        //}

        //[Fact]
        //public void Post_ReturnOk()
        //{
        //    var newBookingRoom = new BookingRoom { Id = 20, BookingId = 10, RoomId = 5 };
        //    var controller = new BookingRoomController();
        //    var result = controller.Post(newBookingRoom);
        //    Assert.IsType<OkObjectResult>(result);
        //    BookingRoomController.listBookingRoom.Remove(newBookingRoom); 
        //}

        //[Fact]
        //public void Post_ReturnDuplicateExists()
        //{
        //    var existingBookingRoom = new BookingRoom { Id = 3, BookingId = 1, RoomId = 1 }; 
        //    var controller = new BookingRoomController();
        //    var result = controller.Post(existingBookingRoom);
        //    var contentResult = Assert.IsType<ContentResult>(result);
        //    Assert.Equal("הקשר בין חדר להזמנה כבר קיים!", contentResult.Content);
        //}

        //[Fact]
        //public void Delete_ReturnOkAndVerifyDeletion()
        //{
        //    var idToDelete = 30;
        //    var bookingRoomToDelete = new BookingRoom { Id = idToDelete, BookingId = 3, RoomId = 3 };
        //    BookingRoomController.listBookingRoom.Add(bookingRoomToDelete);
        //    var controller = new BookingRoomController();

        //    var result = controller.Delete(idToDelete);

        //    Assert.IsType<OkResult>(result);
        //    Assert.Null(BookingRoomController.listBookingRoom.Find(br => br.Id == idToDelete));
        //}

        //[Fact]
        //public void Delete_ReturnNotFound()
        //{
        //    var idToDelete = 999;
        //    var controller = new BookingRoomController();

        //    var result = controller.Delete(idToDelete);

        //    var contentResult = Assert.IsType<ContentResult>(result);
        //    Assert.Equal("לא נמצא קשר חדר-הזמנה למחיקה", contentResult.Content);
        //}
    }
}