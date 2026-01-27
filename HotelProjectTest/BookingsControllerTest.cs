using System;
using System.Collections.Generic;
using System.Linq;
using HotelProject.Controllers;
using HotelProject.Models;
using Microsoft.AspNetCore.Mvc;
using Xunit; 

namespace HotelProjectTest
{
    public class BookingsControllerTest
    {
        //[Fact]
        //public void Get_ReturnList()
        //{
        //    var controller = new BookingsController();
        //    var result = controller.Get();
        //    Assert.IsType<List<Booking>>(result);
        //}

        //[Fact]
        //public void GetById_ReturnOk()
        //{
        //    var id = 1;
        //    var controller = new BookingsController();
        //    var result = controller.Get(id);
        //    Assert.IsType<OkObjectResult>(result);
        //    var okResult = Assert.IsType<OkObjectResult>(result);
        //    var booking = Assert.IsType<Booking>(okResult.Value);
        //    Assert.Equal(id, booking.Id);
        //}

        //[Fact]
        //public void GetById_ReturnNotFound()
        //{
        //    var id = 999;
        //    var controller = new BookingsController();
        //    var result = controller.Get(id);
        //    Assert.IsType<NotFoundResult>(result);
        //}


        //[Fact]
        //public void Post_ReturnOk()
        //{
        //    var newBooking = new Booking
        //    {
        //        Id = 20,
        //        UserId = 2,
        //        CheckInDate = new DateTime(2026, 1, 1),
        //        CheckOutDate = new DateTime(2026, 1, 7),
        //        BookingDate = DateTime.Now,
        //        FinalPrice = 5000,
        //        Status = BookingStatus.Pending
        //    };
        //    var controller = new BookingsController();
        //    var result = controller.Post(newBooking);
        //    Assert.IsType<OkObjectResult>(result);
        //    BookingsController.listBooking.Remove(newBooking); 
        //}

        //[Fact]
        //public void Post_ReturnBookingExists()
        //{
        //    var existingBooking = new Booking
        //    {
        //        Id = 1, 
        //        UserId = 2,
        //        CheckInDate = new DateTime(2026, 1, 1),
        //        CheckOutDate = new DateTime(2026, 1, 7),
        //        FinalPrice = 5000,
        //        Status = BookingStatus.Pending
        //    };
        //    var controller = new BookingsController();
        //    var result = controller.Post(existingBooking);
        //    var contentResult = Assert.IsType<ContentResult>(result);
        //    Assert.Equal("הזמנה עם מזהה זה כבר קיימת במערכת!", contentResult.Content);
        //}

        //[Fact]
        //public void Put_ReturnOkAndVerifyUpdate()
        //{
        //    var idToUpdate = 101;
        //    var originalBooking = new Booking { Id = idToUpdate, UserId = 1, FinalPrice = 1000, CheckInDate = DateTime.Today.AddDays(1), CheckOutDate = DateTime.Today.AddDays(3), BookingDate = DateTime.Now, Status = BookingStatus.Confirmed };
        //    BookingsController.listBooking.Add(originalBooking);

        //    var updatedPrice = 15000;
        //    var updatedBooking = new Booking { Id = idToUpdate, UserId = 2, FinalPrice = updatedPrice, CheckInDate = DateTime.Today.AddDays(1), CheckOutDate = DateTime.Today.AddDays(3), BookingDate = DateTime.Now, Status = BookingStatus.Confirmed };
        //    var controller = new BookingsController();

        //    var result = controller.Put(idToUpdate, updatedBooking);

        //    Assert.IsType<OkObjectResult>(result);
        //    var bookingInList = BookingsController.listBooking.Find(b => b.Id == idToUpdate);
        //    Assert.Equal(updatedPrice, bookingInList.FinalPrice);

        //    BookingsController.listBooking.Remove(bookingInList);
        //}

        //[Fact]
        //public void Delete_ReturnOkAndVerifyDeletion()
        //{
        //    var idToDelete = 30;
        //    var bookingToDelete = new Booking { Id = idToDelete, UserId = 1, FinalPrice = 1000, CheckInDate = DateTime.Today.AddDays(1), CheckOutDate = DateTime.Today.AddDays(3), BookingDate = DateTime.Now, Status = BookingStatus.Pending };
        //    BookingsController.listBooking.Add(bookingToDelete);
        //    var controller = new BookingsController();

        //    var result = controller.Delete(idToDelete);

        //    Assert.IsType<OkResult>(result);
        //    Assert.Null(BookingsController.listBooking.Find(b => b.Id == idToDelete));
        //}

        //[Fact]
        //public void Delete_ReturnNotFound()
        //{
        //    var idToDelete = 999;
        //    var controller = new BookingsController();

        //    var result = controller.Delete(idToDelete);

        //    var contentResult = Assert.IsType<ContentResult>(result);
        //    Assert.Equal("לא נמצאה הזמנה למחיקה", contentResult.Content);
        //}
    }
}