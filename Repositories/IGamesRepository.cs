using PlayFlix.Models;

namespace PlayFlix.Repositories
{
    public interface IGamesRepository
    {
        void Add(Games game);
        void Delete(int id);
        List<Games> GetAll();
        Games GetGameById(int id);
        void Update(Games game);
    }
}