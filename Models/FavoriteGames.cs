namespace PlayFlix.Models
{
    public class FavoriteGames
    {
        public int Id { get; set; }
        public int GameId { get; set; }
        public int UId { get; set; }
        public Games Games { get; set; }


    }
}
