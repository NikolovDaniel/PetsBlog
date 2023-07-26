namespace PetBlog.Core.Models.Pet
{
    public class PetCardViewModel
    {
        /// <summary>
        /// Identificator.
        /// </summary>
        public Guid Id { get; set; }

        /// <summary>
        /// Name of the Pet.
        /// </summary>
        public string Name { get; set; } = null!;

        /// <summary>
        /// Image of the Pet.
        /// </summary>
        public string? Image { get; set; }
    }
}

