using PlayFlix.Models;

namespace PlayFlix.Repositories
{
    public interface IUserInfoRepository
    {
        void Add(UserInfo userInfo);
        void Delete(int id);
        void Update(UserInfo userInfo);
    }
}