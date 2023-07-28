using System.Linq.Expressions;
using AutoMapper;
using PetBlog.Core.Contracts;
using PetBlog.Core.Models.Image;
using PetBlog.Infrastructure.Data.Entities;
using PetBlog.Infrastructure.Data.Repositories;

namespace PetBlog.Core.Services
{
    public class ImageService : IImageService
    {
        private readonly IRepository _repository;
        private readonly IMapper _mapper;

        public ImageService(IRepository repository, IMapper mapper)
        {
            this._repository = repository;
            this._mapper = mapper;
        }

        public IEnumerable<ImageViewModel> GetImagesByPetId(Guid id)
        {
            Expression<Func<Images, bool>> expression
              = i => i.PetId == id;

            var images = this._repository.AllReadonly<Images>(expression);

            var model = images.Select(img => new ImageViewModel()
            {
                Image = Convert.ToBase64String(img.Data),
                Category = img.Category
            });

            return model;
        }


        public async Task AddAsync(ImageFormModel model, byte[] imageData)
        {
            if (model == null || imageData == null || imageData.Length <= 0)
            {
                throw new ArgumentException();
            }

            Pet pet = await this._repository.GetByIdAsync<Pet>(model.PetId);

            if (pet == null || pet.OwnerId != model.OwnerId)
            {
                throw new ArgumentException("Owner Id is not correct.");
            }

            Images petImage = _mapper.Map<Images>(model);
            petImage.Data = imageData;
            await this._repository.AddAsync<Images>(petImage);
            await this._repository.SaveChangesAsync();
        }

        public Task DeleteAsync(Guid imgId)
        {
            throw new NotImplementedException();
        }
    }
}

