using PlayFlix.Models;

namespace PlayFlix.Repositories
{
    public interface IGamesRepository
    {
        void Add(PostGames game);
        void Delete(int id);
        List<Games> GetAll();
        Games GetGameById(int id);
        void Update(PostGames game);
        List<Games> Search(string game);
    }
}