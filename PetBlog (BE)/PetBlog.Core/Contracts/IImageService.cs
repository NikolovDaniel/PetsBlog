using PetBlog.Core.Models.Image;

namespace PetBlog.Core.Contracts
{
    public interface IImageService
    {
        Task AddAsync(ImageFormModel model, byte[] imageData);
        Task DeleteAsync(Guid imgId);
    }
}

