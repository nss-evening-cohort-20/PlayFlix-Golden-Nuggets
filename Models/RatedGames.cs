namespace PlayFlix.Models
{
    public class RatedGames
    {
        public int Id { get; set; }
        public int Rating { get; set; }
        public int GameId { get; set; }
        public int Uid { get; set; }
        Games games { get; set; }


    }
}
