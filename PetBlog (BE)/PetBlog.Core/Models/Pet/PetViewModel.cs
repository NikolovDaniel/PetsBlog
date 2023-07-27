using System;
using PetBlog.Infrastructure.Data.Entities;
using PetBlog.Infrastructure.Utilities;
using System.ComponentModel.DataAnnotations;
using PetBlog.Core.Models.Image;

namespace PetBlog.Core.Models.Pet
{
    public class PetViewModel
    {
        /// <summary>
        /// Identificator.
        /// </summary>
        [Key]
        public Guid Id { get; set; }

        /// <summary>
        /// Owner name.
        /// </summary>
        public string OwnerName { get; set; } = null!;

        /// <summary>
        /// Name of the Pet.
        /// </summary>
        public string Name { get; set; } = null!;

        /// <summary>
        /// Description of the Pet.
        /// </summary>
        public string Description { get; set; } = null!;

        /// <summary>
        /// Type of the Pet.
        /// </summary>
        public string Type { get; set; } = null!;

        /// <summary>
        /// Birth date of the Pet.
        /// </summary>
        public DateTime BirthDate { get; set; }

        /// <summary>
        /// Collection of Loves.
        /// </summary>
        public string[] Loves { get; set; } = null!;

        /// <summary>
        /// Collection of Hates.
        /// </summary>
        public string[] Hates { get; set; } = null!;

        /// <summary>
        /// Collection of Images.
        /// </summary>
        public IEnumerable<ImageViewModel> Images { get; set; } = null!;
    }
}

