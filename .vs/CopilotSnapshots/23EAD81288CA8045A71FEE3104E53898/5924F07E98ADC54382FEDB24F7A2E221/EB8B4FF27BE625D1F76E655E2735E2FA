using Fleet_Service.Models;
using MongoDB.Driver;
using Fleet_Service.Data;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Fleet_Service.Repositories
{
    public class VehicleRepository
    {
        private readonly IMongoCollection<Vehicle> _vehiclesCollection;

        public VehicleRepository(MongoDbContext dbContext)
        {
            _vehiclesCollection = dbContext.Vehicles;
        }

        public async Task<List<Vehicle>> GetAllAsync()
        {
            return await _vehiclesCollection.Find(_ => true).ToListAsync();
        }

        public async Task<Vehicle?> GetByIdAsync(string id)
        {
            return await _vehiclesCollection.Find(v => v.Id == id).FirstOrDefaultAsync();
        }

        public async Task CreateAsync(Vehicle newVehicle)
        {
            await _vehiclesCollection.InsertOneAsync(newVehicle);
        }

        public async Task UpdateAsync(string id, Vehicle updatedVehicle)
        {
            await _vehiclesCollection.ReplaceOneAsync(v => v.Id == id, updatedVehicle);
        }

        public async Task DeleteAsync(string id)
        {
            await _vehiclesCollection.DeleteOneAsync(v => v.Id == id);
        }
    }
}
