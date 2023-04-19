using Microsoft.Extensions.Hosting;
using PlayFlix.Models;
using PlayFlix.Utils;

namespace PlayFlix.Repositories
{
    public class GamesGenreRepository : BaseRepository
    {
        public GamesGenreRepository(IConfiguration configuration) : base(configuration) { }

        public List<GamesGenre> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT Id, GameId, GenreId
                            FROM GameGenre";
                    var reader = cmd.ExecuteReader();

                    var gameGenre = new List<GamesGenre>();
                    while (reader.Read())
                    {
                        gameGenre.Add(new GamesGenre()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            GameId = DbUtils.GetInt(reader, "GameId"),
                            GenreId = DbUtils.GetInt(reader, "GenreId"),
                        });
                    }

                    reader.Close();

                    return gameGenre;
                }
            }
        }

    }
}

