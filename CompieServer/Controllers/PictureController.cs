using Compie.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Compie.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PictureController : ControllerBase
    {
        private readonly IPictureService _service;

        public PictureController(IPictureService service)
        {
            _service = service;
        }

        [HttpGet]
        public IActionResult GetAll([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 8, [FromQuery] string search = "")
        {
            try
            {
                if (pageNumber < 1 || pageSize < 1)
                {
                    return BadRequest("Page number and page size must be greater than zero.");
                }

                var results = _service.GetAllPictures(pageNumber, pageSize, search);
                return Ok(results);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            try
            {
                var picture = _service.GetPictureById(id);

                if (picture == null)
                {
                    return NotFound($"Picture with ID {id} was not found.");
                }

                return Ok(picture);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("{id}/messages")]
        public IActionResult GetChatHistory(string id)
        {
            try
            {
                if (string.IsNullOrEmpty(id))
                {
                    return BadRequest("Picture ID is required.");
                }

                var messages = _service.GetMessagesByPictureId(id);
                return Ok(messages);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error retrieving chat history: {ex.Message}");
            }
        }

    }
}
