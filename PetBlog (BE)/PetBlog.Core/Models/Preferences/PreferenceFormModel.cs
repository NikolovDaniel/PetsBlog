using System.ComponentModel.DataAnnotations;

namespace PetBlog.Core.Models.Preferences
{
    public class PreferenceFormModel
    {
        public Guid PetId { get; set; }

        [Required]
        public string Name { get; set; } = null!;
    }
}

