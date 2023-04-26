using PlayFlix.Models;

namespace PlayFlix.Repositories
{
    public interface IRatedGamesRepository
    {
        void Add(RatedGames game);
        void Delete(int id);
        List<RatedGames> GetAll();
        List<RatedGames> GetRatedGamesByUId(int id);
        void Update(RatedGames game);
    }
}