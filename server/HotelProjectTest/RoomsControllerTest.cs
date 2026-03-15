using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HotelProject.Controllers;
using HotelProject.Core.Models;
using Microsoft.AspNetCore.Mvc;

namespace HotelProjectTest
{
    public class RoomsControllerTest
    {
        //[Fact]
        //public void Get_ReturnList()
        //{
        //    var controller = new RoomsController();
        //    var result = controller.Get();
        //    Assert.IsType<List<Room>>(result);
        //}
        //[Fact]
        //public void GetById_ReturnOk()
        //{
        //    var id = 1;
        //    var controller = new RoomsController();
        //    var result = controller.Get(id);
        //    Assert.IsType<OkObjectResult>(result);
        //}

        //[Fact]
        //public void GetById_ReturnNotFount()
        //{
        //    var id = 2;
        //    var controller = new RoomsController();
        //    var result = controller.Get(id);
        //    Assert.IsType<NotFoundResult>(result);
        //}
        //[Fact]
        //public void Post_ReturnOk()
        //{
        //    var newRoom = new Room { Id = 2, RoomNumber = 102, Status = RoomStatus.Available, NumberOfBeds = 2, BasePrice = 1500, Floor = 1 };
        //    var controller = new RoomsController();
        //    var result = controller.Post(newRoom);
        //    Assert.IsType<OkResult>(result);
        //}
        //[Fact]
        //public void Post_ReturnRoomExists()
        //{
        //    var newRoom = new Room { Id = 3, RoomNumber = 101, Status = RoomStatus.Available, NumberOfBeds = 3, BasePrice = 2000, Floor = 1 };
        //    var controller = new RoomsController();
        //    var result = controller.Post(newRoom);
        //    var contentResult = Assert.IsType<ContentResult>(result);
        //    Assert.Equal("החדר כבר קיים במערכת!", contentResult.Content);
        //}
        //[Fact]
        //public void Put_ReturnOk()
        //{
        //    var idToUpdate = 1;
        //    var updatedRoom = new Room { Id = 1, RoomNumber = 101, Status = RoomStatus.Occupied, NumberOfBeds = 6, BasePrice = 4000, Floor = 1 };
        //    var controller = new RoomsController();
        //    var result = controller.Put(idToUpdate, updatedRoom);
        //    var okResult = Assert.IsType<OkObjectResult>(result);
        //    var roomInList = RoomsController.listRoom.Find(r => r.Id == idToUpdate);
        //    Assert.Equal(RoomStatus.Occupied, roomInList.Status);
        //    Assert.Equal(6, roomInList.NumberOfBeds);
        //    Assert.Equal(4000, roomInList.BasePrice);
        //}

        //[Fact]
        //public void Put_ReturnNotFount()
        //{
        //    var idToUpdate = 2;
        //    var room = new Room { Id = 2, RoomNumber = 102, Status = RoomStatus.Occupied, NumberOfBeds = 6, BasePrice = 4000, Floor = 1 };
        //    var controller = new RoomsController();
        //    var result = controller.Put(idToUpdate, room);
        //    var contentResult = Assert.IsType<ContentResult>(result);
        //    Assert.Equal("לא קיים החדר המבוקש", contentResult.Content);
        //}

        //[Fact]
        //public void PutStatus_ReturnOk()
        //{
        //    var idToUpdate = 1;
        //    var newStatus = RoomStatus.Occupied;
        //    var controller = new RoomsController();
        //    var result = controller.PutStatus(idToUpdate, newStatus);
        //    var okResult = Assert.IsType<OkObjectResult>(result);
        //    var roomInList = RoomsController.listRoom.Find(r => r.Id == idToUpdate);
        //    Assert.Equal(RoomStatus.Occupied, roomInList.Status);
        //}

        //[Fact]
        //public void PutStatus_ReturnNotFound()
        //{
        //    var idToUpdate = 5;
        //    var newStatus = RoomStatus.Occupied;
        //    var controller = new RoomsController();
        //    var result = controller.PutStatus(idToUpdate, newStatus);
        //    var contentResult = Assert.IsType<ContentResult>(result);
        //    Assert.Equal("לא קיים החדר המבוקש", contentResult.Content);
        //}

        //[Fact]
        //public void Delete_ReturnOk()
        //{
        //    var idToDelete =1;
        //    var controller = new RoomsController();
        //    var result = controller.Delete(idToDelete);
        //    Assert.IsType<OkResult>(result);
        //    Assert.Null(RoomsController.listRoom.Find(r => r.Id == idToDelete));
        //}

        //[Fact]
        //public void Delete_ReturnNotFound()
        //{
        //    RoomsController.listRoom = new List<Room> { new Room { Id = 1, RoomNumber = 101, Status = RoomStatus.Available, NumberOfBeds = 5, BasePrice = 3000, Floor = 1 } };
        //    var idToDelete = 5;
        //    var controller = new RoomsController();
        //    var result = controller.Delete(idToDelete);
        //    var contentResult = Assert.IsType<ContentResult>(result);
        //    Assert.Equal("לא נמצא חדר למחיקה", contentResult.Content);
        //}
    }
}
