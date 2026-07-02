using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Fleet_Service.Enums;
using System;
using System.Collections.Generic;

namespace Fleet_Service.Models
{
    public class Container
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("container_number")]
        public string ContainerNumber { get; set; } = string.Empty;

        [BsonElement("iso_code")]
        public string IsoCode { get; set; } = string.Empty;

        [BsonElement("container_type")]
        public ContainerType ContainerType { get; set; }

        [BsonElement("size_ft")]
        public ContainerSize SizeFt { get; set; }

        [BsonElement("max_weight_kg")]
        public decimal MaxWeightKg { get; set; }

        [BsonElement("tare_weight_kg")]
        public decimal TareWeightKg { get; set; }

        [BsonElement("status")]
        public ContainerStatus Status { get; set; } = ContainerStatus.AVAILABLE;

        [BsonElement("owner_company")]
        public string OwnerCompany { get; set; } = string.Empty;

        [BsonElement("color")]
        public string Color { get; set; } = string.Empty;

        [BsonElement("images")]
        public List<string> Images { get; set; } = new List<string>();

        [BsonElement("manufacture_date")]
        public DateTime ManufactureDate { get; set; }

        [BsonElement("inspection_expiry")]
        public DateTime InspectionExpiry { get; set; }

        [BsonElement("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [BsonElement("updated_at")]
        public DateTime? UpdatedAt { get; set; }
    }
}