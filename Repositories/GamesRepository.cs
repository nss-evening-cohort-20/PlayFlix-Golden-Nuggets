using Microsoft.Extensions.Hosting;
using PlayFlix.Models;
using PlayFlix.Utils;

namespace PlayFlix.Repositories
{
    public class GamesRepository : BaseRepository, IGamesRepository
    {
        public GamesRepository(IConfiguration configuration) : base(configuration) { }

        public List<Games> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT Id,Title, Description, Rating, GameImg, iFrame
                            FROM Games";
                    var reader = cmd.ExecuteReader();

                    var games = new List<Games>();
                    while (reader.Read())
                    {
                        games.Add(new Games()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Title = DbUtils.GetInt(reader, "Title"),
                            Descrtiption = DbUtils.GetString(reader, "Description"),
                            Rating = DbUtils.GetInt(reader, "Rating"),
                            GameImg = DbUtils.GetString(reader, "GameImg"),
                            iFrame = DbUtils.GetString(reader, "iFrame"),
                        });
                    }


                    reader.Close();

                    return games;
                }
            }
        }

        public Games GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT Id,Title, Description, Rating, GameImg, iFrame
                            FROM Games
                           WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Games game = null;
                    if (reader.Read())
                    {
                        game = new Games()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Title = DbUtils.GetInt(reader, "Title"),
                            Descrtiption = DbUtils.GetString(reader, "Description"),
                            Rating = DbUtils.GetInt(reader, "Rating"),
                            GameImg = DbUtils.GetString(reader, "GameImg"),
                            iFrame = DbUtils.GetString(reader, "iFrame"),
                        };
                    }

                    reader.Close();

                    return game;
                }
            }
        }


        public void Add(Games game)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Games (Id,Title, Description, Rating, GameImg, iFrame)
                        OUTPUT INSERTED.ID
                        VALUES (@Title, @Description, @Rating, @GameImg, @iFrame)";

                    DbUtils.AddParameter(cmd, "@Title", game.Title);
                    DbUtils.AddParameter(cmd, "@Description", game.Descrtiption);
                    DbUtils.AddParameter(cmd, "@Rating", game.Rating);
                    DbUtils.AddParameter(cmd, "@GameImg", game.GameImg);
                    DbUtils.AddParameter(cmd, "@iFrame", game.iFrame);

                    game.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void Update(Games game)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Games
                           SET Title = @Title,
                               Description = @Description,
                               Rating = @Rating,
                               GameImg = @GameImg,
                               iFrame = @iFrame,
                         WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Title", game.Title);
                    DbUtils.AddParameter(cmd, "@Description", game.Descrtiption);
                    DbUtils.AddParameter(cmd, "@Rating", game.Rating);
                    DbUtils.AddParameter(cmd, "@GameImg", game.GameImg);
                    DbUtils.AddParameter(cmd, "@iFrame", game.iFrame);
                    DbUtils.AddParameter(cmd, "@Id", game.Id);

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
                    cmd.CommandText = "DELETE FROM Games WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}

