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
                                ,U.[FirstName]
                                ,U.[LastName]
                                ,U.[Bio]
                                ,U.[ProfileImg]
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
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            Bio = DbUtils.GetString(reader, "Bio"),
                            ProfileImg = DbUtils.GetString(reader, "ProfileImg"), // Updated column name here
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
                                        ,U.[FirstName]
                                        ,U.[LastName]
                                        ,U.[Bio]
                                        ,U.[ProfileImg]              
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
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            Bio = DbUtils.GetString(reader, "Bio"),
                            ProfileImg = DbUtils.GetString(reader, "ProfileImg"),
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
                                        ,U.[FirstName]
                                        ,U.[LastName]
                                        ,U.[Bio]
                                        ,U.[ProfileImg]
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
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            Bio = DbUtils.GetString(reader, "Bio"),
                            ProfileImg = DbUtils.GetString(reader, "ProfileImg"),
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
                           INSERT INTO [User] (uId,Type, FirstName, LastName, Bio, ProfileImg )
                            OUTPUT INSERTED.ID
                            VALUES (@uId, @Type, @FirstName, @LastName, @Bio, @ProfileImg)";

                    DbUtils.AddParameter(cmd, "@uId", user.uId);
                    DbUtils.AddParameter(cmd, "@Type", user.Type);
                    DbUtils.AddParameter(cmd, "@FirstName", user.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", user.LastName);
                    DbUtils.AddParameter(cmd, "@Bio", user.Bio);
                    DbUtils.AddParameter(cmd, "@ProfileImg", user.ProfileImg);

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
                               FirstName = @FirstName,
                               LastName = @LastName,
                               Bio = @Bio
                               ProfileImg=@ProfileImg
                         WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Type", user.Type);
                    DbUtils.AddParameter(cmd, "@FirstName", user.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", user.LastName);
                    DbUtils.AddParameter(cmd, "@Bio", user.Bio);
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

