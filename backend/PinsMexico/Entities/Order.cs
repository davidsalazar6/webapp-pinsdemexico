using System.ComponentModel.DataAnnotations.Schema;

namespace PinsMexico.Entities
{
  public class Order
  {

    public long ID { get; set; }
    public string ClientName { get; set; }
    public string ProductName { get; set; }
    public string StatusKey { get; set; }
    public decimal Quantity { get; set; }
    public decimal Price { get; set; }
    = decimal.Zero;
    public decimal Total
    {
      get
      {
        return Quantity * Price;
      }
    }
    public decimal PayInAdvance { get; set; }
    [NotMapped]
    public decimal Subtotal
    {
      get
      {
        return Total - PayInAdvance;
      }
    }
    public DateTime CreatedDateTime { get; set; }
    public DateTime? UpdatedDateTime { get; set; }
    public string CreatedBy { get; set; }

    public string? UpdatedBy { get; set; }
    public string? InvoiceNumber { get; set; }
    public DateTime? PaymentDate { get; set; }
    public string? TrackingNumber { get; set; }

    [ForeignKey("StatusKey")]
    public Status Status { get; set; }
  }
}
