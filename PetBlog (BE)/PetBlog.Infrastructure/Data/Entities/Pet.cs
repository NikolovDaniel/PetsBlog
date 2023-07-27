using System.ComponentModel.DataAnnotations;
using PetBlog.Infrastructure.Utilities;

namespace PetBlog.Infrastructure.Data.Entities
{
    /// <summary>
    /// Pet Entity representing the entity in the Database table.
    /// </summary>
    public class Pet
    {
        /// <summary>
        /// Identificator.
        /// </summary>
        [Key]
        public Guid Id { get; set; }

        /// <summary>
        /// Owner Identificator.
        /// </summary>
        public Guid OwnerId { get; set; }

        /// <summary>
        /// Type of the Pet.
        /// </summary>
        [Required]
        public string Type { get; set; } = null!;

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
        [Required]
        public DateTime BirthDate { get; set; }

        /// <summary>
        /// Collection of Images.
        /// </summary>
        public IEnumerable<Images> Images { get; set; } = null!;

        /// <summary>
        /// Collection of Loves.
        /// </summary>
        public IEnumerable<Love> Loves { get; set; } = null!;

        /// <summary>
        /// Collection of Hates.
        /// </summary>
        public IEnumerable<Hate> Hates { get; set; } = null!;
    }
}

