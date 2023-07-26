using System;
using PetBlog.Infrastructure.Utilities;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace PetBlog.Core.Models.Pet
{
    public class PetEditFormModel
    {
        /// <summary>
        /// Identificator.
        /// </summary>
        [Required]
        public Guid Id { get; set; }

        /// <summary>
        /// Owner Identificator.
        /// </summary>
        [Required]
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
        /// Current Title Image Identificator.
        /// </summary>
        public Guid? ImageId { get; set; }

        /// <summary>
        /// Property used to Assing the New Image.
        /// </summary>
        public IFormFile? ImageFile { get; set; } = null!;
    }
}

