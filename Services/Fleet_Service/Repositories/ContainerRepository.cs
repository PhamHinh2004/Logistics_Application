using Fleet_Service.Models;
using MongoDB.Driver;
using Fleet_Service.Data;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Fleet_Service.Repositories
{
    public class ContainerRepository
    {
        private readonly IMongoCollection<Container> _containersCollection;

        public ContainerRepository(MongoDbContext dbContext)
        {
            _containersCollection = dbContext.Containers;
        }

        public async Task<List<Container>> GetAllAsync()
        {
            return await _containersCollection.Find(_ => true).ToListAsync();
        }

        public async Task<Container?> GetByIdAsync(string id)
        {
            return await _containersCollection.Find(c => c.Id == id).FirstOrDefaultAsync();
        }

        public async Task CreateAsync(Container newContainer)
        {
            await _containersCollection.InsertOneAsync(newContainer);
        }

        public async Task UpdateAsync(string id, Container updatedContainer)
        {
            await _containersCollection.ReplaceOneAsync(c => c.Id == id, updatedContainer);
        }

        public async Task DeleteAsync(string id)
        {
            await _containersCollection.DeleteOneAsync(c => c.Id == id);
        }
    }
}