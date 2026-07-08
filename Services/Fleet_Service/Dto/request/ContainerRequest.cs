using Fleet_Service.Enums;
using MongoDB.Bson.Serialization.Attributes;

namespace Fleet_Service.dto.request
{
    public class ContainerRequest
    {
        public string ContainerNumber { get; set; } = string.Empty;
        public string IsoCode { get; set; } = string.Empty;
        public ContainerType ContainerType { get; set; }
        public ContainerSize SizeFt { get; set; } 
        public decimal MaxWeightKg { get; set; }
        public decimal TareWeightKg { get; set; }
        public ContainerStatus Status { get; set; }
        public string OwnerCompany { get; set; } = string.Empty;
        public string Color { get; set; } = string.Empty;
        public List<string> Images { get; set; } = new List<string>();
        public DateTime ManufactureDate { get; set; }
        public DateTime InspectionExpiry { get; set; }
    }
}
