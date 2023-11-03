using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PinsMexico.Entities;

namespace PinsMexico.Tests
{
  public class UnitTest1
  {
    [Fact]
    public async Task GetOrder_WithValidId_ReturnsOrder()
    {
      // Arrange
      var options = new DbContextOptionsBuilder<MyDbContext>()
          .UseInMemoryDatabase(databaseName: "TestDb")
          .Options;

      var testOrderId = 1L;
      var testOrder = new Order
      {
        ID = testOrderId,
        ClientName = "Test Client",
        CreatedBy = "Test Creator",
        ProductName = "Test Product",
        StatusKey = "Pending"
      };

      // Seed data
      using (var context = new MyDbContext(options))
      {
        context.Orders.Add(testOrder);
        await context.SaveChangesAsync();

        Assert.Equal(1, await context.Orders.CountAsync());
        Assert.NotNull(await context.Orders.FindAsync(testOrderId));
      }

      // Act
      Order resultOrder;
      using (var context = new MyDbContext(options))
      {
        var controller = new PinsMexico.Controllers.OrdersController(context);
        var actionResult = await controller.GetOrder(testOrderId);
        if (actionResult.Result is OkObjectResult okResult)
        {
          resultOrder = okResult.Value as Order;
        }
        else
        {
          resultOrder = actionResult.Value;
        }
      }

      // Assert
      Assert.NotNull(resultOrder);
      Assert.Equal(testOrderId, resultOrder.ID);
    }
  }
}
