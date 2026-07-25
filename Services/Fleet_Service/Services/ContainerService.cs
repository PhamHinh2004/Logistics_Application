using Fleet_Service.dto.request;
using Fleet_Service.Mappers;
using Fleet_Service.Models;
using Fleet_Service.Repositories;
using System.ComponentModel;

namespace Fleet_Service.Services
{
    public class ContainerService
    {
        private readonly ContainerRepository _containerRepository;

        public ContainerService(ContainerRepository containerRepository)
        {
            _containerRepository = containerRepository;
        }
        public async Task<Models.Container> CreateContainer(ContainerRequest newContainer)
        {
            var container = ContainerMapper.MapToContainer(newContainer);

            await _containerRepository.CreateAsync(container);

            return container;
        }

        public async Task<List<Models.Container>> GetAllAsync()
        {
            return await _containerRepository.GetAllAsync();
        }

        public async Task<Models.Container?> GetByIdAsync(string id)
        {
            return await _containerRepository.GetByIdAsync(id);
        }

        public async Task UpdateAsync(string id, Models.Container updatedContainer)
        {
            await _containerRepository.UpdateAsync(id, updatedContainer);
        }

        public async Task DeleteAsync(string id)
        {
            await _containerRepository.DeleteAsync(id);

        }
    }
}
