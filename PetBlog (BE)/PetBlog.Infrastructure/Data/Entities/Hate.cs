using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PetBlog.Infrastructure.Data.Entities
{
    /// <summary>
    /// Hate Entity representing the entity in the Database table.
    /// </summary>
    public class Hate
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
        /// Name of what the Pet hates.
        /// </summary>
        [Required]
        public string Name { get; set; } = null!;
    }
}

