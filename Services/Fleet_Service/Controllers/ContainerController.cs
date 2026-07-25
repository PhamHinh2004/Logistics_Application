using Fleet_Service.dto.request;
using Fleet_Service.Models;
using Fleet_Service.Repositories;
using Fleet_Service.Services;
using Microsoft.AspNetCore.Mvc;

namespace Fleet_Service.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContainerController : ControllerBase
    {
        private readonly ContainerService _containerService;

        public ContainerController(ContainerService containerService)
        {
            _containerService = containerService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Container>>> GetAll()
        {
            var containers = await _containerService.GetAllAsync();
            return Ok(containers);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Container>> GetById(string id)
        {
            var container = await _containerService.GetByIdAsync(id);
            if (container == null)
            {
                return NotFound(new { message = $"Container with id '{id}' not found." });
            }
            return Ok(container);
        }

        [HttpPost]
        public async Task<IActionResult> Create(ContainerRequest newContainer)
        {
             var container = await _containerService.CreateContainer(newContainer);
            return CreatedAtAction(nameof(GetById), new { id = container.Id }, container);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, Container updatedContainer)
        {
            var existingContainer = await _containerService.GetByIdAsync(id);
            if (existingContainer == null)
            {
                return NotFound(new { message = $"Container with id '{id}' not found." });
            }

            updatedContainer.Id = id; // Ensure ID consistency
            await _containerService.UpdateAsync(id, updatedContainer);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var existingContainer = await _containerService.GetByIdAsync(id);
            if (existingContainer == null)
            {
                return NotFound(new { message = $"Container with id '{id}' not found." });
            }

            await _containerService.DeleteAsync(id);

            return NoContent();
        }
    }
}