using Microsoft.Extensions.Hosting;
using PlayFlix.Models;
using PlayFlix.Utils;

namespace PlayFlix.Repositories
{
    public class FavoriteGamesRepository : BaseRepository
    {
        public FavoriteGamesRepository(IConfiguration configuration) : base(configuration) { }

        public List<FavoriteGames> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT Id, GameId, Uid
                            FROM FavoriteGames";
                    var reader = cmd.ExecuteReader();

                    var favoriteGames = new List<FavoriteGames>();
                    while (reader.Read())
                    {
                        favoriteGames.Add(new FavoriteGames()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            GameId = DbUtils.GetInt(reader, "GameId"),
                            UId = DbUtils.GetString(reader, "Uid"),
                        });
                    }

                    reader.Close();

                    return favoriteGames;
                }
            }
        }

        public void Add(FavoriteGames favoriteGame)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO FavoriteGames (Id,GameId, Uid)
                        OUTPUT INSERTED.ID
                        VALUES (@GameId, @UserId)";

                    DbUtils.AddParameter(cmd, "@GameId", favoriteGame.GameId);
                    DbUtils.AddParameter(cmd, "@UserId", favoriteGame.UId);
                    favoriteGame.Id = (int)cmd.ExecuteScalar();
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
                        UPDATE FavoriteGames
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



    }
}

