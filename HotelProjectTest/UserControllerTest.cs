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
    //public class UserControllerTest
    //{
    //    [Fact]
    //    public void Get_ReturnList()
    //    {
    //        var controller = new UserController();
    //        var result = controller.Get();
    //        Assert.IsType<List<User>>(result);
    //    }
    //    [Fact]
    //    public void GetById_ReturnOk()
    //    {
    //        var id = 1;
    //        var controller = new UserController();
    //        var result = controller.Get(id);
    //        Assert.IsType<OkObjectResult>(result);
    //    }

    //    [Fact]
    //    public void GetById_ReturnNotFount()
    //    {
    //        var id = 3;
    //        var controller = new UserController();
    //        var result = controller.Get(id);
    //        Assert.IsType<NotFoundResult>(result);
    //    }
    //    [Fact]
    //    public void Post_ReturnOk()
    //    {
    //        var newUser = new User { Id = 3, Tz = "123896780", FirstName = "uria", LastName = "dan", Phone = "050-1908711", Role = UserRole.Client };
    //        var controller = new UserController();
    //        var result = controller.Post(newUser);
    //        Assert.IsType<OkResult>(result);
    //    }
    //    [Fact]
    //    public void Post_ReturnUserExists()
    //    {
    //        var newUser = new User { Id = 4, Tz = "123456780", FirstName = "pini", LastName = "msholam", Phone = "050-1908711", Role = UserRole.Client };
    //        var controller = new UserController();
    //        var result = controller.Post(newUser);
    //        var contentResult = Assert.IsType<ContentResult>(result);
    //        Assert.Equal("משתמש עם תעודת זהות זו כבר קיים במערכת!", contentResult.Content);
    //    }
    //    [Fact]
    //    public void Put_ReturnOk()
    //    {
    //        var idToUpdate = 1;
    //        var updatedUser = new User { Id = 1, Tz = "123456780", FirstName = "David", LastName = "levi", Phone = "050-1197711", Role = UserRole.Client };
    //        var controller = new UserController();
    //        var result = controller.Put(idToUpdate, updatedUser);
    //        var okResult = Assert.IsType<OkObjectResult>(result);
    //        var userInList = UserController.listUser.Find(r => r.Id == idToUpdate);
    //        Assert.Equal(UserRole.Client, userInList.Role);
    //        Assert.Equal("123456780", userInList.Tz);
    //        Assert.Equal("David", userInList.FirstName);
    //        Assert.Equal("levi", userInList.LastName);
    //        Assert.Equal("050-1197711", userInList.Phone);

    //    }

    //    [Fact]
    //    public void Put_ReturnNotFount()
    //    {
    //        var idToUpdate = 3;
    //        var User = new User { Id = 3, Tz = "109876480", FirstName = "David", LastName = "levi", Phone = "050-1111111", Role = UserRole.manager };
    //        var controller = new UserController();
    //        var result = controller.Put(idToUpdate, User);
    //        var contentResult = Assert.IsType<ContentResult>(result);
    //        Assert.Equal("לא קיים משתמש לעדכון", contentResult.Content);
    //    }
    //}
}
