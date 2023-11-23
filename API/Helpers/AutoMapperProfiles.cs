using API.DTOs;
using API.Entities;
using API.Extensions;
using AutoMapper;

namespace API.Helpers
{
  public class AutoMapperProfiles : Profile
  {
    public AutoMapperProfiles()
    {
      CreateMap<AppUser, MemberDto>()
        .ForMember(dest => dest.PhotoUrl,
         opt => opt.MapFrom(src => src.Photos.FirstOrDefault(b => b.IsMAin == true).Url))
        .ForMember(dest => dest.Age,
         opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()));

      CreateMap<Photo, PhotoDto>();

      CreateMap<MemberUpdateDto, AppUser>();
      CreateMap<RegisterDTO, AppUser>();

      CreateMap<Message, MessageDto>()
        .ForMember(dest => dest.SenderPhotoUrl,
        opt => opt.MapFrom(src => src.Sender.Photos.FirstOrDefault(b => b.IsMAin).Url))
        .ForMember(dest => dest.RecipientPhotoUrl,
        opt => opt.MapFrom(src => src.Recipient.Photos.FirstOrDefault(b => b.IsMAin).Url));

      CreateMap<AppUser, UserDto>()
        .ForMember(dest => dest.Username, opt => opt.MapFrom(src => src.UserName));

      CreateMap<(Message Message, UserDto UserDto), ConversationDto>()
        .ForMember(dest => dest.AppUsername,
        opt => opt.MapFrom(src => src.UserDto.Username))
        .ForMember(dest => dest.ContactUsername,
        opt => opt.MapFrom(src => src.UserDto.Username == src.Message.RecipientUsername ? src.Message.SenderUsername : src.Message.RecipientUsername))
        .ForMember(dest => dest.LastMessage,
        opt => opt.MapFrom(src => src.Message.Content))
        .ForMember(dest => dest.LastSent,
        opt => opt.MapFrom(src => src.Message.MessageSent))
        .ForMember(dest => dest.ContactPhotoUrl,
        opt => opt.MapFrom(src => src.UserDto.Username == src.Message.RecipientUsername ? src.Message.Sender.Photos.FirstOrDefault(p => p.IsMAin).Url : src.Message.Recipient.Photos.FirstOrDefault(p => p.IsMAin).Url));


      CreateMap<DateTime, DateTime>().ConvertUsing(d => DateTime.SpecifyKind(d, DateTimeKind.Utc));
      CreateMap<DateTime?, DateTime?>().ConvertUsing(d => d.HasValue ? DateTime.SpecifyKind(d.Value, DateTimeKind.Utc) : null);

    }
  }
}
