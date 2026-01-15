using Compie.DTOs;
using Compie.Services;
using Microsoft.AspNetCore.SignalR;
using System.Text.RegularExpressions;

namespace Compie.Hubs
{
    public class ChatHub : Hub
    {
        private readonly IPictureService _service;
        public ChatHub(IPictureService service)
        {
            _service = service;
        }
        public async Task SendMessage(string pictureId, string user, string message)
        {
            var dto = new ChatMessageDto(pictureId, user, message);

            _service.SaveMessage(dto);

            await Clients.Group(pictureId).SendAsync("ReceiveMessage", user, message);
        }

        public async Task JoinPictureChat(string pictureId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, pictureId);
        }
    }
}
