using Microsoft.AspNetCore.Mvc;
using PlayFlix.Repositories;
using PlayFlix.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PlayFlix.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavoriteGamesController : ControllerBase
    {
        private readonly IFavoriteGamesRepository _favoriteGamesRepository;
        public FavoriteGamesController(IFavoriteGamesRepository favoriteGamesRepository)
        {
            _favoriteGamesRepository = favoriteGamesRepository;
        }
        // GET: api/<GamesController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_favoriteGamesRepository.GetAll());
        }

        // POST api/<GamesController>
        [HttpPost]
        public IActionResult Post(FavoriteGames game)
        {
            _favoriteGamesRepository.Add(game);
            return CreatedAtAction("Get", new { id = game.Id }, game);
        }

        // PUT api/<GamesController>/5
        //[HttpPut("{id}")]
        //public IActionResult Put(int id, Games games)
        //{
        //    if (id != games.Id)
        //    {
        //        return BadRequest();
        //    }
        //    _favoriteGamesRepository.Update(games);
        //    return NoContent();
        //}

        // DELETE api/<GamesController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _favoriteGamesRepository.Delete(id);
            return NoContent();
        }
    }
}
