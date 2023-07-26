using System;
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

