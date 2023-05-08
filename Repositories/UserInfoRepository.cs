using PlayFlix.Models;
using PlayFlix.Utils;

namespace PlayFlix.Repositories
{
    public class UserInfoRepository : BaseRepository, IUserInfoRepository
    {
        public UserInfoRepository(IConfiguration configuration) : base(configuration) { }



        public void Add(UserInfo userInfo)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                           INSERT INTO [User] (uId,Type, Name, Bio, ProfileImg )
                            OUTPUT INSERTED.ID
                            VALUES (@uId, @Type, Name, Bio, ProfileImg)";

                    DbUtils.AddParameter(cmd, "@uId", userInfo.Name);
                    DbUtils.AddParameter(cmd, "@Name", userInfo.Name);
                    DbUtils.AddParameter(cmd, "@Bio", userInfo.Bio);
                    DbUtils.AddParameter(cmd, "@ProfileImg", userInfo.profileImg);

                    userInfo.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void Update(UserInfo userInfo)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE [User] (Type, Name, Bio, ProfileImg)
                           SET Type = @Type, @Name, Bio, ProfileImg
                         WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Type", userInfo.Type);
                    DbUtils.AddParameter(cmd, "@Name", userInfo.Name);
                    DbUtils.AddParameter(cmd, "@Bio", userInfo.Bio);
                    DbUtils.AddParameter(cmd, "@ProfileImg", userInfo.profileImg);

                    DbUtils.AddParameter(cmd, "@Id", userInfo.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM [User] WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}



