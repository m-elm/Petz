using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
  public interface IMessageRepository
    {
        void AddMessage(Message message);
        void DeleteMessage(Message message);

        Task<Message> GetMessage(int id);

        Task<PagedList<MessageDto>> GetMessagesForUser(MessageParams messageParams);
        Task<IEnumerable<MessageDto>> GetMessageThread(string currentUserName, string recipientUsername);

        void AddGroup(Group group);

        void RemoveConnection(Connection connection);

        Task<Connection> GetConnection(string connectionId);
        Task<Group> GetMessageGroup(string goupName);

        Task<Group> GetGroupFromConnection(string connectionId);

        Task<IEnumerable<ConversationDto>> GetConversations(string currentUsername);
    }

}
