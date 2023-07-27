using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PetBlog.Infrastructure.Data.Entities
{
    /// <summary>
    /// Images Entity representing the entity in the Database table.
    /// </summary>
    public class Images
    {
        /// <summary>
        /// Identificator.
        /// </summary>
        [Key]
        public Guid Id { get; set; }

        /// <summary>
        /// Foreign Key.
        /// </summary>
        [Required]
        [ForeignKey(nameof(Pet))]
        public Guid PetId { get; set; }

        /// <summary>
        /// Navigation Property.
        /// </summary>
        public Pet Pet { get; set; } = null!;

        /// <summary>
        /// Data Entity that holds the image data.
        /// </summary>
        [Required]
        public byte[] Data { get; set; } = null!;

        /// <summary>
        /// Description of the Image.
        /// </summary>
        [Required]
        public string Description { get; set; } = null!;

        /// <summary>
        /// Category of the Image.
        /// </summary>
        [Required]
        public string Category { get; set; } = null!;
    }
}

