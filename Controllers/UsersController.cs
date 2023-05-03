using Microsoft.AspNetCore.Mvc;
using PlayFlix.Repositories;
using PlayFlix.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PlayFlix.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        public UsersController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        // GET: api/<UsersController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_userRepository.GetAll());
        }

        // GET api/<UsersController>/5
        [HttpGet("id/{id}")]
        public IActionResult GetByUserId(int id)
        {
            var user = _userRepository.GetByUserId(id);
            if (user == null) 
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpGet("uid/{uid}")]
        public IActionResult GetByFirebaseId(string uid)
        {
            var user = _userRepository.GetByFirebaseId(uid);
            if (user == null)
            {
                return Ok(false);
            }
            return Ok(user);
        }

        // POST api/<UsersController>
        [HttpPost]
        public IActionResult Post(User user)
        {
            _userRepository.Add(user);
            return CreatedAtAction("Get", new { id = user.Id }, user);
        }

        // PUT api/<UsersController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }
            _userRepository.Update(user);
            return NoContent();
        }

        // DELETE api/<UsersController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _userRepository.Delete(id);
            return NoContent();
        }
    }
}
