using PlayFlix.Models;

namespace PlayFlix.Repositories
{
    public interface IUserRepository
    {
        void Add(User user);
        void Delete(int id);
        List<User> GetAll();
        User GetByFirebaseId(string uid);
        User GetByUserId(int id);
        void Update(User user);
    }
}