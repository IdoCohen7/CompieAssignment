using Compie.DTOs;
using Compie.Models;

namespace Compie.Services
{
    public interface IPictureService
    {
        List<Picture> GetAllPictures(int pageNumber = 1, int pageSize = 8, string search = "");
        Picture? GetPictureById(int id);
        void SaveMessage(ChatMessageDto message);
        List<ChatMessageDto> GetMessagesByPictureId(string pictureId);
    }
}
