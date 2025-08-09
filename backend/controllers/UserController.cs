using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApi.Data;
using MyApi.Models;

namespace MyApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsersController(AppDbContext context)
        {
            _context = context;
        }

        // GET
        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            try
            {
                var users = await _context.Users.ToListAsync();
                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while fetching users.", error = ex.Message });
            }
        }

        // POST
        [HttpPost]
        public async Task<IActionResult> CreateUser(User user)
        {
            try
            {
                var exists = await _context.Users
                    .AnyAsync(u => u.Email.ToLower() == user.Email.ToLower());

                if (exists)
                {
                    return Conflict(new { message = "user with this email already exists." });
                }

                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                return Ok(new { message = "User created ", data = user });
                
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "error occurred while creating the user.", error = ex.Message });
            }
        }

        // PUT
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, User user)
        {
            try
            {
                var existing = await _context.Users.FindAsync(id);
                if (existing == null)
                    return NotFound(new { message = "User not found." });

                existing.FirstName = user.FirstName;
                existing.LastName = user.LastName;
                existing.Email = user.Email;
                existing.Phone = user.Phone;
                existing.Address = user.Address;
                existing.City = user.City;

                await _context.SaveChangesAsync();

                return Ok(new { message = "User updated successfully!", data = existing });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while updating the user.", error = ex.Message });
            }
        }
    }
}


