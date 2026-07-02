using Fleet_Service.Models;
using Fleet_Service.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Fleet_Service.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContainerController : ControllerBase
    {
        private readonly ContainerRepository _containerRepository;

        public ContainerController(ContainerRepository containerRepository)
        {
            _containerRepository = containerRepository;
        }

        [HttpGet]
        public async Task<ActionResult<List<Container>>> GetAll()
        {
            var containers = await _containerRepository.GetAllAsync();
            return Ok(containers);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Container>> GetById(string id)
        {
            var container = await _containerRepository.GetByIdAsync(id);
            if (container == null)
            {
                return NotFound(new { message = $"Container with id '{id}' not found." });
            }
            return Ok(container);
        }

        [HttpPost]
        public async Task<IActionResult> Create(Container newContainer)
        {
            await _containerRepository.CreateAsync(newContainer);
            return CreatedAtAction(nameof(GetById), new { id = newContainer.Id }, newContainer);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, Container updatedContainer)
        {
            var existingContainer = await _containerRepository.GetByIdAsync(id);
            if (existingContainer == null)
            {
                return NotFound(new { message = $"Container with id '{id}' not found." });
            }

            updatedContainer.Id = id; // Ensure ID consistency
            await _containerRepository.UpdateAsync(id, updatedContainer);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var existingContainer = await _containerRepository.GetByIdAsync(id);
            if (existingContainer == null)
            {
                return NotFound(new { message = $"Container with id '{id}' not found." });
            }

            await _containerRepository.DeleteAsync(id);

            return NoContent();
        }
    }
}