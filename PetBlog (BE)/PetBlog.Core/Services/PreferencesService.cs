using PetBlog.Core.Contracts;
using PetBlog.Core.Models.Helpers;
using PetBlog.Core.Models.Preferences;
using PetBlog.Infrastructure.Data.Entities;
using PetBlog.Infrastructure.Data.Repositories;

namespace PetBlog.Core.Services
{
    public class PreferencesService : IPreferencesService
    {
        private readonly IRepository _repository;

        public PreferencesService(IRepository repository)
        {
            this._repository = repository;
        }

        public async Task<ServiceResult<bool>> AddAsync(PreferencesFormModel model)
        {
            var result = new ServiceResult<bool>(false);

            if (model.Preferences != null && model.Preferences.FirstOrDefault(x => string.IsNullOrWhiteSpace(x)) != null)
            {
                result.AddError("Preferences should not be empty or null.");
                return result;
            }

            var pet = await this._repository.GetByIdAsync<Pet>(model.PetId);

            if (pet == null || pet.OwnerId != model.OwnerId)
            {
                result.AddError("Invalid PetId or OwnerId.");
                return result;
            }

            // Check the number of hates or loves
            int maxPreferences = 10;
            if (model.Preferences.Count() > maxPreferences)
            {
                result.AddError($"You can only add up to {maxPreferences} hates or loves.");
                return result;
            }

            if (model.Type == "Hates")
            {
                if (pet.Hates.Count() + model.Preferences.Count() > 10)
                {
                    int availableSlots = 10 - pet.Hates.Count();
                    int hatesCanBeAdded = availableSlots < 0 ? 0 : availableSlots;
                    result.AddError($"You can only add up to 10 hates. You can add {hatesCanBeAdded} more hates");
                    return result;
                }

                var entities = model.Preferences
                   .Select(p => new Hate()
                   {
                       PetId = model.PetId,
                       Name = p
                   });

                await this._repository.AddRangeAsync(entities);
            }
            else
            {
                if (pet.Loves.Count() + model.Preferences.Count() > 10)
                {
                    int availableSlots = 10 - pet.Loves.Count();
                    int lovesCanBeAdded = availableSlots < 0 ? 0 : availableSlots;
                    result.AddError($"You can only add up to 10 loves. You can add {lovesCanBeAdded} more loves");
                    return result;
                }

                var entities = model.Preferences
                    .Select(p => new Love()
                    {
                        PetId = model.PetId,
                        Name = p
                    });

                await this._repository.AddRangeAsync(entities);
            }

            await this._repository.SaveChangesAsync();
            result.Data = true; // means that everything went through

            return result;
        }
    }
}

