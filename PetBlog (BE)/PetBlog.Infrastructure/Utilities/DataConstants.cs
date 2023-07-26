using System;
namespace PetBlog.Infrastructure.Utilities
{
    /// <summary>
    /// Constants messages for validation, error messages etc.
    /// </summary>
    public static class DataConstants
    {
        // Pet Entity constants
        public const int PetNameMinLength = 3;
        public const int PetNameMaxLength = 50;
        public const string PetNameErrorMessage = "Name should be between 3 and 50 characters";

        public const int PetDescriptionMinLength = 50;
        public const int PetDescriptionMaxLength = 1000;
        public const string PetDescriptionErrorMessage = "Description should be between 50 and 1000 characters";
    }
}

