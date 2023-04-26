using Microsoft.Extensions.Hosting;
using PlayFlix.Models;
using PlayFlix.Utils;

namespace PlayFlix.Repositories
{
    public class RatedGamesRepository : BaseRepository, IRatedGamesRepository
    {
        public RatedGamesRepository(IConfiguration configuration) : base(configuration) { }

        public List<RatedGames> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    Select
                     R.[id]
                    ,R.[userId]
                    ,R.[GameId]
                    ,R.[Rating]
                    From[RatedGames] as R;";
                    var reader = cmd.ExecuteReader();

                    var games = new List<RatedGames>();
                    while (reader.Read())
                    {
                        games.Add(new RatedGames()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserId = DbUtils.GetInt(reader, "userId"),
                            GameId = DbUtils.GetInt(reader, "GameId"),
                            Rating = DbUtils.GetInt(reader, "Rating"),
                        });
                    }


                    reader.Close();

                    return games;
                }
            }
        }

        public List<RatedGames> GetRatedGamesByUId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    Select
                     R.[id]
                    ,R.[userId]
                    ,R.[GameId]
                    ,R.[Rating]
                    From[RatedGames] as R
                    WHERE R.[userId] = @Id;";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    var games = new List<RatedGames>();
                    while (reader.Read())
                    {
                        games.Add(new RatedGames()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserId = DbUtils.GetInt(reader, "userId"),
                            GameId = DbUtils.GetInt(reader, "GameId"),
                            Rating = DbUtils.GetInt(reader, "Rating"),
                        });
                    }


                    reader.Close();

                    return games;
                }
            }
        }


        public void Add(RatedGames game)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO RatedGames (userId, GameId, Rating)
                        OUTPUT INSERTED.ID
                        VALUES (@userId, @GameId, @Rating)";

                    DbUtils.AddParameter(cmd, "@userId", game.UserId);
                    DbUtils.AddParameter(cmd, "@GameId", game.GameId);
                    DbUtils.AddParameter(cmd, "@Rating", game.Rating);

                    int id = (int)cmd.ExecuteScalar();
                    game.Id = id;

                }
            }
        }
        public void Update(RatedGames game)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE RatedGames
                           SET 
                            Rating = @Rating,
                         WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@Rating", game.Rating);

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
                    cmd.CommandText = "DELETE FROM RatedGames WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}

//Add rating
//Update Rating
//Get ratings by user id
//Delete Rating