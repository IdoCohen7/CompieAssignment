using Compie.DTOs;
using Compie.Models;
using Microsoft.EntityFrameworkCore;

namespace Compie.Services
{
    public class PictureService : IPictureService
    {
        private static List<Picture> _pictures = new List<Picture>
        {
            new Picture { Id = 1, Name = "Serene Ocean", Artist = "Maya Gold", Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", ImageUrl = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&sig=1" },
            new Picture { Id = 2, Name = "Mountain Peak", Artist = "Liam Stone", Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", ImageUrl = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500&sig=2" },
            new Picture { Id = 3, Name = "Urban Jungle", Artist = "Zoe Reed", Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", ImageUrl = "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=500&sig=3" },
            new Picture { Id = 4, Name = "Golden Autumn", Artist = "Ethan Hunt", Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", ImageUrl = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&sig=4" },
            new Picture { Id = 5, Name = "Abstract Storm", Artist = "Sari Levi", Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", ImageUrl = "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=500&sig=5" },
            new Picture { Id = 6, Name = "Desert Sands", Artist = "Omar Sharif", Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", ImageUrl = "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?w=500&sig=6" },
            new Picture { Id = 7, Name = "Morning Mist", Artist = "Elena Rose", Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", ImageUrl = "https://images.unsplash.com/photo-1439853949127-fa647821eba0?w=500&sig=7" },
            new Picture { Id = 8, Name = "Forest Secrets", Artist = "John Wood", Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", ImageUrl = "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&sig=8" },
            new Picture { Id = 10, Name = "Quiet Village", Artist = "Anna Bell", Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", ImageUrl = "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500&sig=10" },
            new Picture { Id = 11, Name = "Galactic Dust", Artist = "Cosmo Ray", Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", ImageUrl = "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=500&sig=11" },
            new Picture { Id = 12, Name = "Rustic Barn", Artist = "Caleb Miller", Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", ImageUrl = "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500&sig=12" },
            new Picture { Id = 13, Name = "Neon Lights", Artist = "Vicky Night", Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", ImageUrl = "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&sig=13" },
            new Picture { Id = 14, Name = "Wild Flowers", Artist = "Lily Green", Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", ImageUrl = "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=500&sig=14" },
            new Picture { Id = 15, Name = "Deep Canyon", Artist = "Rick Rock", Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", ImageUrl = "https://images.unsplash.com/photo-1500964757637-c85e8a162699?w=500&sig=15" },
            new Picture { Id = 16, Name = "Frozen Lake", Artist = "Ice Man", Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", ImageUrl = "https://images.unsplash.com/photo-1476610182048-b716b8518aae?w=800&q=80" }
        };

        private static readonly List<ChatMessageDto> _chatHistory = new();

        public List<Picture> GetAllPictures(int pageNumber = 1, int pageSize = 8, string search = "")
        {
            var results = _pictures.AsQueryable();

            // if search term is given - filtering pictures by artist name or picture name
            if (!string.IsNullOrEmpty(search))
            {
                var s = search.ToLower();
                results = results.Where(p =>
                    p.Name.ToLower().Contains(s) ||
                    p.Artist.ToLower().Contains(s));
            }

            // pagination
            return results
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .AsNoTracking()
                .ToList();
        }

        public Picture? GetPictureById(int id)
        {
            return _pictures.FirstOrDefault(p => p.Id == id);
        }

        public void SaveMessage(ChatMessageDto message)
        {
            _chatHistory.Add(message);
        }

        public List<ChatMessageDto> GetMessagesByPictureId(string pictureId)
        {
            return _chatHistory.Where(m => m.PictureId == pictureId).ToList();
        }
    }
}