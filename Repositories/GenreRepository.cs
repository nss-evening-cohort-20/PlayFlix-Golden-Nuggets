using Microsoft.Extensions.Hosting;
using PlayFlix.Models;
using PlayFlix.Utils;

namespace PlayFlix.Repositories
{
    public class GenreRepository : BaseRepository, IGenreRepository
    {
        public GenreRepository(IConfiguration configuration) : base(configuration) { }

        public List<Genre> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT Id, GenreType
                            FROM Genre";
                    var reader = cmd.ExecuteReader();

                    var genre = new List<Genre>();
                    while (reader.Read())
                    {
                        genre.Add(new Genre()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            GenreType = DbUtils.GetString(reader, "GenreType"),

                        });
                    }

                    reader.Close();

                    return genre;
                }
            }
        }

    }
}

