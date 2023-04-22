using PlayFlix.Models;

namespace PlayFlix.Repositories
{
    public interface IGenreRepository
    {
        List<Genre> GetAll();
    }
}