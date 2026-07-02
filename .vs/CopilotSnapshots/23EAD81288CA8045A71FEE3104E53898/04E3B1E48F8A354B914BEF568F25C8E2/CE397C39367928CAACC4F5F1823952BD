using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Fleet_Service.Enums;
using System;

namespace Fleet_Service.Models
{
    public class Driver
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("user_id")]
        public string UserId { get; set; } = string.Empty;

        [BsonElement("license_number")]
        public string LicenseNumber { get; set; } = string.Empty;

        [BsonElement("license_class")]
        public string LicenseClass { get; set; } = string.Empty;

        [BsonElement("license_expiry")]
        public DateTime LicenseExpiry { get; set; }

        [BsonElement("status")]
        public DriverStatus Status { get; set; } = DriverStatus.AVAILABLE;

        [BsonElement("rating")]
        public decimal Rating { get; set; } = 5.0m;

        [BsonElement("total_trips")]
        public int TotalTrips { get; set; } = 0;

        [BsonElement("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
