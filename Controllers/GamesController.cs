using Microsoft.AspNetCore.Mvc;
using PlayFlix.Repositories;
using PlayFlix.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PlayFlix.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GamesController : ControllerBase
    {
        private readonly IGamesRepository _gamesRepository;
        public GamesController(IGamesRepository gamesRepository)
        {
            _gamesRepository = gamesRepository;
        }
        // GET: api/<GamesController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_gamesRepository.GetAll());
        }

        // GET api/<GamesController>/5
        [HttpGet("id/{id}")]
        public IActionResult GetGameById(int id)
        {
            var game = _gamesRepository.GetGameById(id);
            if (game == null) 
            {
                return NotFound();
            }
            return Ok(game);
        }

        // POST api/<GamesController>
        [HttpPost]
        public IActionResult Post(PostGames game)
        {
            _gamesRepository.Add(game);
            return CreatedAtAction("Get", new { id = game.Id }, game);
        }

        // PUT api/<GamesController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, PostGames games)
        {
            if (id != games.Id) 
            {
                return BadRequest();
            }
            _gamesRepository.Update(games);
            return NoContent();
        }

        // DELETE api/<GamesController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _gamesRepository.Delete(id);
            return NoContent();
        }

        [HttpGet("search")]
        public IActionResult Search(string query)
        {
            var game = _gamesRepository.Search(query);
            if(game == null)
            {
                return NotFound();
            }
            return Ok(game);
        }
    }
}
