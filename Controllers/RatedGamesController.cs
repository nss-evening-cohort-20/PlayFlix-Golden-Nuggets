using Microsoft.AspNetCore.Mvc;
using PlayFlix.Repositories;
using PlayFlix.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PlayFlix.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RatedGamesController : ControllerBase
    {
        private readonly IRatedGamesRepository _ratedGamesRepository;
        public RatedGamesController(IRatedGamesRepository ratedGamesRepository)
        {
            _ratedGamesRepository = ratedGamesRepository;
        }
        // GET: api/<RatedGamesController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_ratedGamesRepository.GetAll());
        }

        // GET api/<RatedGamesController>/5
        [HttpGet("id/{id}")]
        public IActionResult GetRatedGamesByUId(int id)
        {
            var game = _ratedGamesRepository.GetRatedGamesByUId(id);
            if (game == null)
            {
                return NotFound();
            }
            return Ok(game);
        }

        // POST api/<RatedGamesController>
        [HttpPost]
        public IActionResult Post(RatedGames game)
        {
            _ratedGamesRepository.Add(game);
            return CreatedAtAction("Get", new { id = game.Id }, game);
        }

        // PUT api/<RatedGamesController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, RatedGames games)
        {
            if (id != games.Id)
            {
                return BadRequest();
            }
            _ratedGamesRepository.Update(games);
            return NoContent();
        }

        // DELETE api/<RatedGamesController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _ratedGamesRepository.Delete(id);
            return NoContent();
        }
    }
}
