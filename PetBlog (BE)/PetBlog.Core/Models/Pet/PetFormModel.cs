using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;
using PetBlog.Infrastructure.Utilities;

namespace PetBlog.Core.Models.Pet
{
    public class PetFormModel
    {
        /// <summary>
        /// Identificator.
        /// </summary>
        [Required(ErrorMessage = "Pet Id is required.")]
        public Guid Id { get; set; }

        /// <summary>
        /// Owner Identificator.
        /// </summary>
        [Required(ErrorMessage = "Owner Id is required.")]
        public Guid OwnerId { get; set; }

        /// <summary>
        /// Owner name.
        /// </summary>
        [Required]
        [StringLength(DataConstants.PetNameMaxLength,
            MinimumLength = DataConstants.PetNameMinLength,
            ErrorMessage = DataConstants.PetNameErrorMessage)]
        public string OwnerName { get; set; } = null!;

        /// <summary>
        /// Name of the Pet.
        /// </summary>
        [Required]
        [StringLength(DataConstants.PetNameMaxLength,
            MinimumLength = DataConstants.PetNameMinLength,
            ErrorMessage = DataConstants.PetNameErrorMessage)]
        public string Name { get; set; } = null!;

        /// <summary>
        /// Type of the Pet.
        /// </summary>
        [Required]
        public string Type { get; set; } = null!;

        /// <summary>
        /// Description of the Pet.
        /// </summary>
        [Required]
        [StringLength(DataConstants.PetDescriptionMaxLength,
            MinimumLength = DataConstants.PetDescriptionMinLength,
            ErrorMessage = DataConstants.PetDescriptionErrorMessage)]
        public string Description { get; set; } = null!;

        /// <summary>
        /// Birth date of the Pet.
        /// </summary>
        [Required(ErrorMessage = "Birth date is invalid.")]
        public DateTime BirthDate { get; set; }

        /// <summary>
        /// Image File.
        /// </summary>
        [Required]
        public IFormFile ImageFile { get; set; } = null!;
    }
}

