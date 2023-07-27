using System;
using PetBlog.Core.Models.Image;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace PetBlog.Core.Models.Pet
{
    public class PetEditViewModel
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
        /// Title Image.
        /// </summary>
        public string Image { get; set; } = null!;

        /// <summary>
        /// Image Identificator.
        /// </summary>
        public Guid ImageId { get; set; }
    }
}

