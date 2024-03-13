using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;
using MobyLabWebProgramming.Core.Responses;
using MobyLabWebProgramming.Infrastructure.Authorization;
using MobyLabWebProgramming.Infrastructure.Services.Implementations;
using MobyLabWebProgramming.Infrastructure.Services.Interfaces;


namespace MobyLabWebProgramming.Backend.Controllers;

/// <summary>
/// This is a controller example to show who to work with files and form data.
/// </summary>
[ApiController] // This attribute specifies for the framework to add functionality to the controller such as binding multipart/form-data.
[Route("api/[controller]/[action]")]
public class ProfessorController : AuthorizedController
{
        private readonly IProfessorService _professorService;

        public ProfessorController(IUserService userService, IProfessorService professorService) : base(userService)
        {
            _professorService = professorService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ServiceResponse<Professor>>> GetProfessor(Guid id)
        {
            var result = await _professorService.GetProfessor(id);
            return Ok(result);
        }

        [HttpGet]
        public async Task<ActionResult<ServiceResponse<List<Professor>>>> GetProfessors()
        {
            var result = await _professorService.GetProfessors();
            return Ok(result);
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<ServiceResponse>> AddProfessor([FromBody] ProfessorAddDTO professor)
        {
        var currentUser = await GetCurrentUser();
        professor.Password = PasswordUtils.HashPassword(professor.Password);
        var result = await _professorService.AddProfessor(professor, currentUser.Result);
        return Ok(result);
    }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult<ServiceResponse>> UpdateProfessor(Guid id, [FromBody] ProfessorUpdateDTO professor)
        {
        /* professor.Id = id; // Ensure the ID from the URL matches the professor object
         var result = await _professorService.UpdateProfessor(professor);
         return Ok(result);*/

        var currentUser = await GetCurrentUser();
        var result = await _professorService.UpdateProfessor(professor with
        {
            Password = !string.IsNullOrWhiteSpace(professor.Password) ? PasswordUtils.HashPassword(professor.Password) : null
        }, currentUser.Result);
        return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ServiceResponse>> DeleteProfessor(Guid id)
        {
            var result = await _professorService.DeleteProfessor(id);
            return Ok(result);
        }
    }
