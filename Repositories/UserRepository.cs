using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Configuration;
using PlayFlix.Models;
using PlayFlix.Utils;

namespace PlayFlix.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(IConfiguration configuration) : base(configuration) { }

        public List<User> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"Select
                                 U.[id]
                                ,U.[uId]
                                ,U.[Type]
                                From[User] as U";
                    var reader = cmd.ExecuteReader();

                    var users = new List<User>();
                    while (reader.Read())
                    {
                        users.Add(new User()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            uId = DbUtils.GetString(reader, "uId"),
                            Type = DbUtils.GetString(reader, "Type"),
                        });
                    }

                    reader.Close();

                    return users;
                }
            }
        }
        public User GetByUserId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        Select
                                        U.Id
                                        ,U.[uId]
                                        ,U.[Type]              
                                        From [User] as U
                                        where U.Id = @Id
                                        ";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    User user = null;
                    if (reader.Read())
                    {
                        user = new User()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            uId = DbUtils.GetString(reader, "uId"),
                            Type = DbUtils.GetString(reader, "Type"),
                        };
                    }

                    reader.Close();

                    return user;
                }
            }
        }
        public User GetByFirebaseId(string uid)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        Select
                                        U.Id
                                        ,U.[uId]
                                        ,U.[Type]
                                        From [User] as U
                                        where U.uId = @uId
                                        ";


                    DbUtils.AddParameter(cmd, "@uId", uid);

                    var reader = cmd.ExecuteReader();

                    User user = null;
                    if (reader.Read())
                    {
                        user = new User()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            uId = DbUtils.GetString(reader, "uId"),
                            Type = DbUtils.GetString(reader, "Type"),
                        };
                    }

                    reader.Close();

                    return user;
                }
            }
        }


        public void Add(User user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                           INSERT INTO [User] (uId,Type)
                            OUTPUT INSERTED.ID
                            VALUES (@uId, @Type)";

                    DbUtils.AddParameter(cmd, "@uId", user.uId);
                    DbUtils.AddParameter(cmd, "@Type", user.Type);

                    user.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void Update(User user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE [User]
                           SET Type = @Type,
                         WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Type", user.Type);
                    
                    DbUtils.AddParameter(cmd, "@Id", user.Id);

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

