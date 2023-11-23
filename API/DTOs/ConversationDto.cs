namespace API.DTOs
{
  public class ConversationDto
    {
        public int Id { get; set; }
        public string AppUsername { get; set; }
        public string ContactUsername { get; set; }
        public string ContactPhotoUrl { get; set; }
        public string LastMessage { get; set; }
        public DateTime LastSent { get; set; } = DateTime.UtcNow;
    }
}
