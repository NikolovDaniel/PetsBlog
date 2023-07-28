using Microsoft.AspNetCore.Mvc;
using PetBlog.Core.Contracts;
using PetBlog.Core.Models.Image;

namespace PetBlog.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ImagesController : Controller
    {
        private readonly IImageService _imageService;

        public ImagesController(IImageService imageService)
        {
            this._imageService = imageService;
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult GetPetImagesById(Guid id)
        {
            try
            {
                var model = this._imageService.GetImagesByPetId(id);

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

        [HttpPost("{apiKey}")]
        public async Task<ActionResult> Add([FromForm] ImageFormModel model)
        {
            if (model.ImageFile == null || model.ImageFile.Length == 0)
            {
                return BadRequest("No image file is selected.");
            }

            try
            {
                byte[] imageData = null;
                using (var memoryStream = new MemoryStream())
                {
                    await model.ImageFile.CopyToAsync(memoryStream);
                    memoryStream.Seek(0, SeekOrigin.Begin);
                    imageData = memoryStream.ToArray();
                }

                if (model.Description == null || string.IsNullOrEmpty(model.Description))
                {
                    model.Description = "No description"; 
                }

                await this._imageService.AddAsync(model, imageData);

                return Ok("Image uploaded successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest(string.Format($"Something went wrong...\nError: {ex.Message}"));
            }
        }
    }
}

