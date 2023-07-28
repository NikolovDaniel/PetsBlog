using System;
using System.Linq.Expressions;
using System.Text;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PetBlog.Core.Contracts;
using PetBlog.Core.Models.Helpers;
using PetBlog.Core.Models.Image;
using PetBlog.Core.Models.Pet;
using PetBlog.Infrastructure.Data.Entities;
using PetBlog.Infrastructure.Data.Repositories;

namespace PetBlog.Core.Services
{
    public class PetService : IPetService
    {
        private readonly IRepository _repository;
        private readonly IMapper _mapper;

        public PetService(IRepository repository, IMapper mapper)
        {
            this._repository = repository;
            this._mapper = mapper;
        }

        public IEnumerable<PetCardViewModel> GetAll()
        {
            var pets = this._repository.GetAllPetsWithTitleImage();

            var models = pets.Select(p => new PetCardViewModel()
            {
                Id = p.Id,
                Name = p.Name,
                Image = p.Images.FirstOrDefault() != null
                ? Convert.ToBase64String(p.Images.FirstOrDefault().Data)
                : null
            });

            return models;
        }

        public async Task AddAsync(PetFormModel model)
        {
            Pet pet = _mapper.Map<Pet>(model);

            byte[] imageData = null;
            using (var memoryStream = new MemoryStream())
            {
                await model.ImageFile.CopyToAsync(memoryStream);
                memoryStream.Seek(0, SeekOrigin.Begin);
                imageData = memoryStream.ToArray();
            }

            Images titleImage = new Images()
            {
                PetId = pet.Id,
                Description = "No description",
                Data = imageData,
                Category = "Title"
            };

            await this._repository.AddAsync<Images>(titleImage);
            await this._repository.AddAsync<Pet>(pet);
            await this._repository.SaveChangesAsync();
        }

        public async Task<PetViewModel> RandomAsync()
        {
            int totalCount = await this._repository.Count<Pet>();

            Random random = new Random();
            int randomIndex = random.Next(0, totalCount);

            var pet = await this._repository
             .AllReadonly<Pet>()
             .Skip(randomIndex)
             .FirstOrDefaultAsync();

            var result = new ServiceResult<bool>(false);

            if (pet == null)
            {
                return null;
            }

            PetViewModel model = _mapper.Map<PetViewModel>(pet);

            Expression<Func<Images, bool>> expression
                = i => i.PetId == pet.Id;

            var images = this._repository.AllReadonly<Images>(expression);

            model.Images = images.Select(img => new ImageViewModel()
            {
                Image = Convert.ToBase64String(img.Data),
                Category = img.Category
            });

            return model;
        }

        public async Task<PetViewModel> GetByIdWithNoImagesAsync(Guid petId)
        {
            var pet = await this._repository.GetByIdAsync<Pet>(petId);

            if (pet == null)
            {
                return null;
            }

            PetViewModel model = _mapper.Map<PetViewModel>(pet);

            return model;
        }

        public async Task<PetViewModel> GetByIdAsync(Guid petId)
        {
            var pet = await this._repository.GetByIdAsync<Pet>(petId);

            if (pet == null)
            {
                return null;
            }

            PetViewModel model = _mapper.Map<PetViewModel>(pet);

            Expression<Func<Images, bool>> expression
                = i => i.PetId == petId;

            var images = this._repository.AllReadonly<Images>(expression);

            model.Images = images.Select(img => new ImageViewModel()
            {
                Image = Convert.ToBase64String(img.Data),
                Category = img.Category
            });


            return model;
        }

        public async Task<PetEditViewModel> GetByIdAsync(Guid petId, Guid ownerId)
        {
            var pet = await this._repository.GetByIdAsync<Pet>(petId);

            if (pet == null || pet.OwnerId != ownerId)
            {
                return null;
            }

            Expression<Func<Images, bool>> expression
                = i => i.PetId == petId && i.Category.ToLower() == "title".ToLower();

            var image = await this._repository.AllReadonly<Images>(expression).FirstOrDefaultAsync();

            PetEditViewModel model = new PetEditViewModel()
            {
                Name = pet.Name,
                Description = pet.Description,
                OwnerName = pet.OwnerName,
                BirthDate = pet.BirthDate,
                Type = pet.Type,
                ImageId = image.Id,
                Image = image.Data != null ? Convert.ToBase64String(image.Data) : null
            };

            return model;
        }

        public async Task<ServiceResult<bool>> UpdateAsync(PetEditFormModel model)
        {
            var result = new ServiceResult<bool>(false);

            var pet = await this._repository.GetByIdAsync<Pet>(model.Id);

            if (pet == null || pet.OwnerId != model.OwnerId)
            {
                result.AddError("Invalid PetId or OwnerId.");
                return result;
            }

            pet.OwnerName = model.OwnerName;
            pet.BirthDate = model.BirthDate;
            pet.Type = model.Type;
            pet.Name = model.Name;
            pet.Description = model.Description;

            var image = await this._repository.GetByIdAsync<Images>(model.ImageId);

            if (image != null || model.ImageFile != null)
            {
                byte[] imageData = null;
                using (var memoryStream = new MemoryStream())
                {
                    await model.ImageFile.CopyToAsync(memoryStream);
                    memoryStream.Seek(0, SeekOrigin.Begin);
                    imageData = memoryStream.ToArray();
                }

                image.Data = imageData;
            }

            await this._repository.SaveChangesAsync();

            result.Data = true;
            return result;
        }

        public byte[] GetAllByOwnerId(Guid ownerId)
        {
            Expression<Func<Pet, bool>> expression
             = p => p.OwnerId == ownerId;

            var pets = this._repository.AllReadonly<Pet>(expression);

            StringBuilder sb = new StringBuilder();

            sb.AppendLine($"Owner ID: {ownerId}");

            if (pets == null || pets.Count() <= 0)
            {
                sb.AppendLine($"\nPets: No pets were found with this Owner ID!");
            }
            else
            {
                sb.AppendLine($"\nPets:");

                foreach (var pet in pets)
                {
                    sb.AppendLine($"\n{pet.Name} : ID: {pet.Id}");
                }
            }

            byte[] fileContent = Encoding.UTF8.GetBytes(sb.ToString());

            return fileContent;
        }
    }
}

