using Microsoft.AspNetCore.Mvc;
using PetBlog.Core.Contracts;
using PetBlog.Core.Models.Pet;

namespace PetBlog.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PetsController : Controller
    {
        private readonly IPetService _petService;

        public PetsController(IPetService petService)
        {
            this._petService = petService;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult GetAll()
        {
            try
            {
                var pets = this._petService.GetAll();

                return Ok(pets);
            }
            catch (Exception ex)
            {
                return BadRequest(string.Format($"Something went wrong...\nError: {ex.Message}"));
            }
        }

        [HttpPost("{apiKey}")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Add([FromForm] PetFormModel petModel)
        {
            try
            {
                await this._petService.AddAsync(petModel);

                return Created(new Uri("/Pets/" + petModel, UriKind.Relative), petModel);
            }
            catch (Exception ex)
            {
                return BadRequest(string.Format($"Something went wrong...\nError: {ex.Message}"));
            }
        }

        [HttpGet("Random")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> GetRandom()
        {
            try
            {
                PetViewModel model = await this._petService.RandomAsync();

                if (model == null)
                {
                    return NotFound("Nothing was found.");
                }

                return Ok(model);
            }
            catch (Exception ex)
            {
                return BadRequest(string.Format($"Something went wrong...\nError: {ex.Message}"));
            }
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> GetById(Guid id)
        {
            try
            {
                PetViewModel model = await this._petService.GetByIdAsync(id);

                if (model == null)
                {
                    return NotFound("A Pet with this Id was not found.");
                }

                return Ok(model);
            }
            catch (Exception ex)
            {
                return BadRequest(string.Format($"Something went wrong...\nError: {ex.Message}"));
            }
        }

        [HttpGet("Edit")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> GetByIdAndOwnerId([FromQuery]Guid id, [FromQuery]Guid ownerId)
        {
            try
            {
                PetEditViewModel model = await this._petService.GetByIdAsync(id, ownerId);

                if (model == null)
                {
                    return NotFound("A Pet with this Id or Owner Id was not found.");
                }

                return Ok(model);
            }
            catch (Exception ex)
            {
                return BadRequest(string.Format($"Something went wrong...\nError: {ex.Message}"));
            }
        }

        [HttpPut("{apiKey}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Edit([FromForm] PetEditFormModel model)
        {
            try
            {
                var serviceResult = await this._petService.UpdateAsync(model);

                if (serviceResult.Errors.Any())
                {
                    foreach (var error in serviceResult.Errors)
                    {
                        ModelState.AddModelError("Error", error);
                    }

                    return BadRequest(ModelState);
                }

                return Ok(model);
            }
            catch (Exception ex)
            {
                return BadRequest(string.Format($"Something went wrong...\nError: {ex.Message}"));
            }
        }

        [HttpGet("Download")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult Download([FromQuery] Guid ownerId)
        {
            if (ownerId == Guid.Empty)
            {
                return BadRequest("Owner ID is required.");
            }

            var textContent = this._petService.GetAllByOwnerId(ownerId);

            return File(textContent, "text/plain", "OwnerAndPetsIds.txt");
        }
    }
}

