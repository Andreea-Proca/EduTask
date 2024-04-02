using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;
using MobyLabWebProgramming.Core.Requests;
using MobyLabWebProgramming.Core.Responses;
using MobyLabWebProgramming.Infrastructure.Authorization;
using MobyLabWebProgramming.Infrastructure.Extensions;
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

    [Authorize]
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<RequestResponse<ProfessorDTO>>> GetById([FromRoute] Guid id) // The FromRoute attribute will bind the id from the route to this parameter.
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _professorService.GetProfessor(id)) :
            this.ErrorMessageResult<ProfessorDTO>(currentUser.Error);
    }

    [Authorize]
    [HttpGet] // This attribute will make the controller respond to a HTTP GET request on the route /api/User/GetPage.
    public async Task<ActionResult<RequestResponse<PagedResponse<ProfessorDTO>>>> GetPage([FromQuery] PaginationSearchQueryParams pagination) // The FromQuery attribute will bind the parameters matching the names of
                                                                                                                                         // the PaginationSearchQueryParams properties to the object in the method parameter.
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _professorService.GetProfessorsPage(pagination)) :
            this.ErrorMessageResult<PagedResponse<ProfessorDTO>>(currentUser.Error);
    }

    /*
    [Authorize]
    [HttpGet]
        public async Task<ActionResult<ServiceResponse<List<Professor>>>> GetProfessors()
        {
            var result = await _professorService.GetProfessors();
            return Ok(result);
        } */

    [Authorize]
        [HttpPost]
        public async Task<ActionResult<RequestResponse>> Add([FromBody] ProfessorAddDTO professor)
        {
            var currentUser = await GetCurrentUser();
            professor.Password = PasswordUtils.HashPassword(professor.Password);

            return currentUser.Result != null ?
               this.FromServiceResponse(await _professorService.AddProfessor(professor, currentUser.Result)) :
               this.ErrorMessageResult(currentUser.Error);
        }

        [Authorize]
        [HttpPut]
        public async Task<ActionResult<RequestResponse>> Update([FromBody] ProfessorUpdateDTO professor)
        {
            var currentUser = await GetCurrentUser();

            return currentUser.Result != null ?
                this.FromServiceResponse(await _professorService.UpdateProfessor(professor with
                {
                    Password = !string.IsNullOrWhiteSpace(professor.Password) ? PasswordUtils.HashPassword(professor.Password) : null
                }, currentUser.Result)) :
                this.ErrorMessageResult(currentUser.Error);
        }

        [Authorize] // You need to use this attribute to protect the route access, it will return a Forbidden status code if the JWT is not present or invalid, and also it will decode the JWT token.
        [HttpDelete("{id:guid}")]
        public async Task<ActionResult<RequestResponse>> Delete([FromRoute] Guid id)
        {
            var currentUser = await GetCurrentUser();

            return currentUser.Result != null ?
                this.FromServiceResponse(await _professorService.DeleteProfessor(id)) :
                this.ErrorMessageResult(currentUser.Error);
        }
    }
