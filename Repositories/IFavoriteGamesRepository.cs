using PlayFlix.Models;

namespace PlayFlix.Repositories
{
    public interface IFavoriteGamesRepository
    {
        void Add(FavoriteGames favoriteGame);
        void Delete(int id);
        List<FavoriteGames> GetAll(string uId);
        //void Update(Games game);
    }
}