namespace PlayFlix.Models
{
    public class FavoriteGames
    {
        public int Id { get; set; }
        public int GameId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UId { get; set; }
        public Games Games { get; set; }
    }

    public class AddFavoriteGame
    {
        public int Id { get; set; }

        public int GameId { get; set; }

        public int UserId { get; set; }
    }
}
