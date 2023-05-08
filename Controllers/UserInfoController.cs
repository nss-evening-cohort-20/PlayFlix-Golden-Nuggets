using Microsoft.AspNetCore.Mvc;
using PlayFlix.Repositories;
using PlayFlix.Models;
using Microsoft.AspNetCore.Authorization;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PlayFlix.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class UserInfoController : ControllerBase
    {
        private readonly IUserInfoRepository _userInfoRepository;
        public UserInfoController(IUserInfoRepository userInfoRepository)
        {
            _userInfoRepository = userInfoRepository;
        }
        
        
        // POST api/<UsersInfoController>
        [Authorize, HttpPost]
        public IActionResult Post(UserInfo userInfo)
        {
            _userInfoRepository.Add(userInfo);
            return CreatedAtAction("Get", new { id = userInfo.Id }, userInfo);
        }

        // PUT api/<UsersController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, UserInfo userInfo)
        {
            if (id != userInfo.Id)
            {
                return BadRequest();
            }
            _userInfoRepository.Update(userInfo);
            return NoContent();
        }

        // DELETE api/<UsersController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _userInfoRepository.Delete(id);
            return NoContent();
        }
    }
}
