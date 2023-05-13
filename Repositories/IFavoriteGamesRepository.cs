using PlayFlix.Models;

namespace PlayFlix.Repositories
{
    public interface IFavoriteGamesRepository
    {
        void Add(AddFavoriteGame favoriteGame);
        void Delete(int id);
        List<FavoriteGames> GetAll(string uId);
        List<AddFavoriteGame> CheckIfAdded(int id);
    }
}