using PlayFlix.Models;

namespace PlayFlix.Repositories
{
    public interface IUserRepository
    {
        void Add(Users user);
        void Delete(int id);
        List<Users> GetAll();
        Users GetById(int id);
        void Update(Users user);
    }
}