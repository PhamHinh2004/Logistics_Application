using Fleet_Service.Models;
using Fleet_Service.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Fleet_Service.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DriverController : ControllerBase
    {
        private readonly DriverRepository _driverRepository;

        public DriverController(DriverRepository driverRepository)
        {
            _driverRepository = driverRepository;
        }

        [HttpGet]
        public async Task<ActionResult<List<Driver>>> GetAll()
        {
            var drivers = await _driverRepository.GetAllAsync();
            return Ok(drivers);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Driver>> GetById(string id)
        {
            var driver = await _driverRepository.GetByIdAsync(id);
            if (driver == null)
            {
                return NotFound(new { message = $"Driver with id '{id}' not found." });
            }
            return Ok(driver);
        }

        [HttpPost]
        public async Task<IActionResult> Create(Driver newDriver)
        {
            await _driverRepository.CreateAsync(newDriver);
            return CreatedAtAction(nameof(GetById), new { id = newDriver.Id }, newDriver);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, Driver updatedDriver)
        {
            var existingDriver = await _driverRepository.GetByIdAsync(id);
            if (existingDriver == null)
            {
                return NotFound(new { message = $"Driver with id '{id}' not found." });
            }

            updatedDriver.Id = id; // Ensure ID consistency
            await _driverRepository.UpdateAsync(id, updatedDriver);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var existingDriver = await _driverRepository.GetByIdAsync(id);
            if (existingDriver == null)
            {
                return NotFound(new { message = $"Driver with id '{id}' not found." });
            }

            await _driverRepository.DeleteAsync(id);

            return NoContent();
        }
    }
}