using Fleet_Service.Models;
using MongoDB.Driver;
using Fleet_Service.Data;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Fleet_Service.Repositories
{
    public class DriverRepository
    {
        private readonly IMongoCollection<Driver> _driversCollection;

        public DriverRepository(MongoDbContext dbContext)
        {
            _driversCollection = dbContext.Drivers;
        }

        public async Task<List<Driver>> GetAllAsync()
        {
            return await _driversCollection.Find(_ => true).ToListAsync();
        }

        public async Task<Driver?> GetByIdAsync(string id)
        {
            return await _driversCollection.Find(d => d.Id == id).FirstOrDefaultAsync();
        }

        public async Task CreateAsync(Driver newDriver)
        {
            await _driversCollection.InsertOneAsync(newDriver);
        }

        public async Task UpdateAsync(string id, Driver updatedDriver)
        {
            await _driversCollection.ReplaceOneAsync(d => d.Id == id, updatedDriver);
        }

        public async Task DeleteAsync(string id)
        {
            await _driversCollection.DeleteOneAsync(d => d.Id == id);
        }
    }
}