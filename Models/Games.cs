namespace PlayFlix.Models
{
    public class Games
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
            public int? Rating { get; set; }
        public int? UserRating { get; set; }
        public string Genre { get; set; }
        public string GameImg { get; set; }
        public string iFrame { get; set; }
    }
    public class PostGames
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int? Rating { get; set; }
        public int? UserRating { get; set; }
        public int Genre { get; set; }
        public string GameImg { get; set; }
        public string iFrame { get; set; }
    }
}
