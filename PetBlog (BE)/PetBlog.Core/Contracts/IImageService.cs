using PetBlog.Core.Models.Image;

namespace PetBlog.Core.Contracts
{
    public interface IImageService
    {
        IEnumerable<ImageViewModel> GetImagesByPetId(Guid id);
        Task AddAsync(ImageFormModel model, byte[] imageData);
        Task DeleteAsync(Guid imgId);
    }
}

