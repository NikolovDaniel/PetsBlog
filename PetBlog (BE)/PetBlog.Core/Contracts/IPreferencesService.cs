using PetBlog.Core.Models.Helpers;
using PetBlog.Core.Models.Preferences;

namespace PetBlog.Core.Contracts
{
    public interface IPreferencesService
    {
        Task<ServiceResult<bool>> AddAsync(PreferencesFormModel model);
    }
}

