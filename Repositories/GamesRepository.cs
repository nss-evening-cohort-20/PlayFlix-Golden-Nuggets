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
                    WITH AverageRating AS (
                    SELECT 
                    gameId
		            ,AVG(RG.rating) as Average_Rating
                     FROM RatedGames AS RG
                     Group by gameId)
                     SELECT 
	                 G.[Id]
                    ,G.[Title]
                    ,G.[Description]
                    ,Average_Rating
                    ,GN.[genreType]
                    ,G.[GameImg]
                    ,G.[iframe]
                    ,G.[Rating]
                    FROM Games AS G
                    left join AverageRating as AVGR ON AVGR.gameId = G.[Id]
					join genre as GN on GN.id = G.Genre";
                    var reader = cmd.ExecuteReader();

                    var games = new List<Games>();
                    while (reader.Read())
                    {
                        games.Add(new Games()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Description = DbUtils.GetString(reader, "Description"),
                            Rating = DbUtils.GetNullableInt(reader, "Rating"),
                            UserRating = DbUtils.GetNullableInt(reader, "Average_Rating"),
                            Genre = DbUtils.GetString(reader, "genreType"),
                            GameImg = DbUtils.GetString(reader, "GameImg"),
                            iFrame = DbUtils.GetString(reader, "iFrame"),
                        });
                    }


                    reader.Close();

                    return games;
                }
            }
        }

        public Games GetGameById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    WITH AverageRating AS (
                    SELECT 
                    gameId
		            ,AVG(RG.rating) as Average_Rating
                     FROM RatedGames AS RG
                     Group by gameId)
                     SELECT 
	                 G.[Id]
                    ,G.[Title]
                    ,G.[Description]
                    ,Average_Rating
                    ,GN.[genreType]
                    ,G.[GameImg]
                    ,G.[iframe]
                    ,G.[Rating]
                    FROM Games AS G
                    left join AverageRating as AVGR ON AVGR.gameId = G.[Id]
					join genre as GN on GN.id = G.Genre
                    WHERE G.id = @Id;";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Games game = null;
                    if (reader.Read())
                    {
                        game = new Games()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Description = DbUtils.GetString(reader, "Description"),
                            Rating = DbUtils.GetNullableInt(reader, "Rating"),
                            UserRating = DbUtils.GetNullableInt(reader, "Average_Rating"),
                            Genre = DbUtils.GetString(reader, "genreType"),
                            GameImg = DbUtils.GetString(reader, "GameImg"),
                            iFrame = DbUtils.GetString(reader, "iFrame"),
                        };
                    }

                    reader.Close();

                    return game;
                }
            }
        }


        public void Add(PostGames game)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Games (Title, Description, Rating, GameImg, iFrame, Genre)
                        OUTPUT INSERTED.ID
                        VALUES (@Title, @Description, @Rating, @GameImg, @iFrame, @Genre)";

                    DbUtils.AddParameter(cmd, "@Title", game.Title);
                    DbUtils.AddParameter(cmd, "@Description", game.Description);
                    DbUtils.AddParameter(cmd, "@Rating", game.Rating);
                    DbUtils.AddParameter(cmd, "@GameImg", game.GameImg);
                    DbUtils.AddParameter(cmd, "@iFrame", game.iFrame);
                    DbUtils.AddParameter(cmd, "@Genre", game.Genre);

                    game.Id = (int)cmd.ExecuteScalar();
                    
                }
            }
        }
        public void Update(PostGames game)
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
                                Genre = @Genre
                         WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Title", game.Title);
                    DbUtils.AddParameter(cmd, "@Description", game.Description);
                    DbUtils.AddParameter(cmd, "@Rating", game.Rating);
                    DbUtils.AddParameter(cmd, "@GameImg", game.GameImg);
                    DbUtils.AddParameter(cmd, "@Genre", game.Genre);
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

