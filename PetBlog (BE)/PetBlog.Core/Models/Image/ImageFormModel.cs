using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace PetBlog.Core.Models.Image
{
    public class ImageFormModel
    {
        /// <summary>
        /// Pet Identificator.
        /// </summary>
        [Required]
        public Guid PetId { get; set; }

        /// <summary>
        /// Owner Identificator.
        /// </summary>
        [Required]
        public Guid OwnerId { get; set; }

        /// <summary>
        /// Image File.
        /// </summary>
        [Required]
        public IFormFile ImageFile { get; set; } = null!;

        /// <summary>
        /// Description of the Image.
        /// </summary>
        public string? Description { get; set; } = null!;

        /// <summary>
        /// Category of the Image.
        /// </summary>
        [Required]
        public string Category { get; set; } = null!;
    }
}

