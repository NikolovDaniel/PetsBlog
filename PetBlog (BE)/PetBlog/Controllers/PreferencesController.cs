using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using PetBlog.Core.Contracts;
using PetBlog.Core.Models.Preferences;

namespace PetBlog.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PreferencesController : Controller
    {
        private readonly IPreferencesService _preferenceService;

        public PreferencesController(IPreferencesService preferenceService)
        {
            this._preferenceService = preferenceService;
        }

        [HttpPost("{apiKey}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Add([FromForm] PreferencesFormModel model)
        {
            var jsonArray = JsonSerializer.Deserialize<string[]>(model.JsonPreferences);
            model.Preferences = jsonArray;

            if (model.Preferences.Count() <= 0)
            {
                ModelState.AddModelError("Preferences", "Preferences should be at least 1.");
                return BadRequest(ModelState);
            }

            var serviceResult = await _preferenceService.AddAsync(model);

            if (serviceResult.Errors.Any())
            {
                foreach (var error in serviceResult.Errors)
                {
                    ModelState.AddModelError("Error", error);
                }

                return BadRequest(ModelState);
            }

            return Ok("Preferences added successfully.");
        }
    }
}

