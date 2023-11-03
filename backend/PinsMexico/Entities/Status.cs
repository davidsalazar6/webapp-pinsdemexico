using System.ComponentModel.DataAnnotations;

namespace PinsMexico.Entities
{
    public class Status
    {
        [Key]
        public string Key { get; set; }
        public string Name { get; set; }

  }
}
