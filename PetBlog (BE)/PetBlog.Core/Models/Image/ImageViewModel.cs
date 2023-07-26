using System;
namespace PetBlog.Core.Models.Image
{
    public class ImageViewModel
    {
        /// <summary>
        /// Image data.
        /// </summary>
        public string Image { get; set; } = null!;

        /// <summary>
        /// Category of the image.
        /// </summary>
        public string Category { get; set; } = null!;
    }
}

