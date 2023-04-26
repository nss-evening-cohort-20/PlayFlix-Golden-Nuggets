using Microsoft.Extensions.Hosting;
using PlayFlix.Models;
using PlayFlix.Utils;

namespace PlayFlix.Repositories
{
    public class FavoriteGamesRepository : BaseRepository, IFavoriteGamesRepository
    {
        public FavoriteGamesRepository(IConfiguration configuration) : base(configuration) { }
        
        public List<FavoriteGames> GetAll(string uId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT
                        FG.id as FavoriteGameId,
                        FG.userId,
                        U.uId,
                        U.FirstName,
                        U.LastName,
                        G.Title,
                        G.Rating,
                        G.iframe,
                        G.Id as GameId,
                        GN.genreType,
                        G.GameImg,
                        G.[Description]
                        FROM favoriteGames as FG
                        JOIN Games AS G ON FG.gameId = G.Id
                        JOIN genre AS GN ON GN.Id = G.Genre
                        JOIN [User] AS U ON FG.userId = U.Id
                        WHERE uId = @uId";
                    cmd.Parameters.AddWithValue("@uId", uId);
                    var reader = cmd.ExecuteReader();

                    var favoriteGames = new List<FavoriteGames>();
                    while (reader.Read())
                    {
                        favoriteGames.Add(new FavoriteGames()
                        {
                            Id = DbUtils.GetInt(reader, "FavoriteGameId"),
                            GameId = DbUtils.GetInt(reader, "GameId"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            UId = DbUtils.GetString(reader, "uId"),
                            Games = new Games()
                            {
                                Id = DbUtils.GetInt(reader, "GameId"),
                                Title = DbUtils.GetString(reader, "Title"),
                                Description = DbUtils.GetString(reader, "Description"),
                                Rating = DbUtils.GetInt(reader, "Rating"),
                                Genre = DbUtils.GetString(reader, "genreType"),
                                GameImg = DbUtils.GetString(reader, "GameImg"),
                                iFrame = DbUtils.GetString(reader, "iframe")
                            }
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



 

