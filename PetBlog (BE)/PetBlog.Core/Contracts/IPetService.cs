using System;
using PetBlog.Core.Models.Helpers;
using PetBlog.Core.Models.Pet;

namespace PetBlog.Core.Contracts
{
    /// <summary>
    /// Service class which makes the connection betwen the data layer and the api.
    /// </summary>
    public interface IPetService
    {
        IEnumerable<PetCardViewModel> GetAll();
        Task AddAsync(PetFormModel model);
        Task<ServiceResult<bool>> UpdateAsync(PetEditFormModel model);
        Task<PetViewModel> GetByIdAsync(Guid petId);
        Task<PetEditViewModel> GetByIdAsync(Guid petId, Guid ownerId);
        Task<PetViewModel> RandomAsync();
    }
}

