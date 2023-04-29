namespace PlayFlix.Models
{
    public class RatedGames
    {
        public int Id { get; set; }
        public double Rating { get; set; }
        public string? Review { get; set; }
        public int GameId { get; set; }
        public int UserId { get; set; }

    }
}