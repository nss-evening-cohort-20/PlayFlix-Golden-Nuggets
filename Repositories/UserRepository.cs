using Microsoft.Extensions.Hosting;
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
                                        U.[uId]
                                       ,U.[Type]
                                       ,U.[FirstName]
                                       ,U.[LastName]
                                       ,U.[Bio]
                                       From[User] as U";
                    var reader = cmd.ExecuteReader();

                    var users = new List<User>();
                    while (reader.Read())
                    {
                        users.Add(new User()
                        {
                            Id = DbUtils.GetInt(reader, "uId"),
                            Type = DbUtils.GetInt(reader, "Type"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            Bio = DbUtils.GetString(reader, "Bio"),
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
                                        From [User] as U
                                        where U.uId = uId
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
                            Type = DbUtils.GetInt(reader, "Type"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            Bio = DbUtils.GetString(reader, "Bio"),
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
                          SELECT Id, uId,Type, FirstName, LastName, Bio
                            FROM Users
                           WHERE uId = @uId";

                    DbUtils.AddParameter(cmd, "@uId", uid);

                    var reader = cmd.ExecuteReader();

                    User user = null;
                    if (reader.Read())
                    {
                        user = new User()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            uId = DbUtils.GetString(reader, "uId"),
                            Type = DbUtils.GetInt(reader, "Type"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            Bio = DbUtils.GetString(reader, "Bio"),
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
                        INSERT INTO Users (uId,Type, FirstName, LastName, Bio)
                        OUTPUT INSERTED.ID
                        VALUES (@Type, @FirstName, @LastName, @Bio)";

                    DbUtils.AddParameter(cmd, "@Type", user.Type);
                    DbUtils.AddParameter(cmd, "@FirstName", user.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", user.LastName);
                    DbUtils.AddParameter(cmd, "@Bio", user.Bio);

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
                        UPDATE Users
                           SET Type = @Type,
                               FirstName = @FirstName,
                               LastName = @LastName,
                               Bio = @Bio
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
                    cmd.CommandText = "DELETE FROM Users WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}

