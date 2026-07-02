using Fleet_Service.Models;
using Fleet_Service.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Fleet_Service.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VehicleController : ControllerBase
    {
        private readonly VehicleRepository _vehicleRepository;

        public VehicleController(VehicleRepository vehicleRepository)
        {
            _vehicleRepository = vehicleRepository;
        }

        [HttpGet]
        public async Task<ActionResult<List<Vehicle>>> GetAll()
        {
            var vehicles = await _vehicleRepository.GetAllAsync();
            return Ok(vehicles);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Vehicle>> GetById(string id)
        {
            var vehicle = await _vehicleRepository.GetByIdAsync(id);
            if (vehicle == null)
            {
                return NotFound(new { message = $"Vehicle with id '{id}' not found." });
            }
            return Ok(vehicle);
        }

        [HttpPost]
        public async Task<IActionResult> Create(Vehicle newVehicle)
        {
            await _vehicleRepository.CreateAsync(newVehicle);
            return CreatedAtAction(nameof(GetById), new { id = newVehicle.Id }, newVehicle);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, Vehicle updatedVehicle)
        {
            var existingVehicle = await _vehicleRepository.GetByIdAsync(id);
            if (existingVehicle == null)
            {
                return NotFound(new { message = $"Vehicle with id '{id}' not found." });
            }

            updatedVehicle.Id = id; // Ensure ID consistency
            await _vehicleRepository.UpdateAsync(id, updatedVehicle);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var existingVehicle = await _vehicleRepository.GetByIdAsync(id);
            if (existingVehicle == null)
            {
                return NotFound(new { message = $"Vehicle with id '{id}' not found." });
            }

            await _vehicleRepository.DeleteAsync(id);

            return NoContent();
        }
    }
}
