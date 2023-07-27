using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace PetBlog.Core.Models.Preferences
{
    public class PreferencesFormModel
    {
        [Required]
        public Guid PetId { get; set; }

        [Required]
        public Guid OwnerId { get; set; }

        [Required]
        public string Type { get; set; } = null!;

        [JsonPropertyName("Preferences")]
        public string[]? Preferences { get; set; }

        [Required]
        public string JsonPreferences { get; set; } = null!;
    }
}

