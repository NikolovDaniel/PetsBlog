using AutoMapper;
using PetBlog.Core.Models.Image;
using PetBlog.Core.Models.Pet;

namespace PetBlog.Core.Models.AutoMapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            //CreateMap<List<PreferenceFormModel>, List<Infrastructure.Data.Entities.Hate>>();
            //CreateMap<List<PreferenceFormModel>, List<Infrastructure.Data.Entities.Love>>();
            CreateMap<ImageFormModel, Infrastructure.Data.Entities.Images>();
            CreateMap<PetFormModel, Infrastructure.Data.Entities.Pet>();
            CreateMap<PetViewModel, Infrastructure.Data.Entities.Pet>();
            CreateMap<Infrastructure.Data.Entities.Pet, PetFormModel>();
            CreateMap<Infrastructure.Data.Entities.Pet, PetViewModel>()
                .ForMember(dest => dest.Hates, opt => opt
                .MapFrom(src => src.Hates.Select(hate => hate.Name).ToArray()))
                .ForMember(dest => dest.Loves, opt => opt
                .MapFrom(src => src.Loves.Select(love => love.Name).ToArray()));
        }
    }
}

