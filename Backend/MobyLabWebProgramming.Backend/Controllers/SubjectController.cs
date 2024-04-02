using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;
using MobyLabWebProgramming.Core.Responses;
using MobyLabWebProgramming.Infrastructure.Services.Implementations;
using MobyLabWebProgramming.Infrastructure.Services.Interfaces;
using MobyLabWebProgramming.Infrastructure.Authorization;
using MobyLabWebProgramming.Infrastructure.Extensions;
using MobyLabWebProgramming.Core.Requests;
using System.Xml.Linq;


namespace MobyLabWebProgramming.Backend.Controllers;

/// <summary>
/// This is a controller example to show who to work with files and form data.
/// </summary>
[ApiController] // This attribute specifies for the framework to add functionality to the controller such as binding multipart/form-data.
[Route("api/[controller]/[action]")]
public class SubjectController : AuthorizedController
    {
        private readonly ISubjectService _subjectService;

        public SubjectController(IUserService userService, ISubjectService subjectService) : base(userService)
        {
            _subjectService = subjectService;
        }

    [Authorize]
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<RequestResponse<SubjectDTO>>> GetById([FromRoute] Guid id) // The FromRoute attribute will bind the id from the route to this parameter.
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _subjectService.GetSubject(id)) :
            this.ErrorMessageResult<SubjectDTO>(currentUser.Error);
    }
    /*
    [Authorize]
        [HttpGet]
        public async Task<ActionResult<ServiceResponse<List<Subject>>>> GetSubjects()
        {
            var result = await _subjectService.GetSubjects();
            return Ok(result);
        } */

    /*
    [Authorize]
        [HttpGet("count")]
        public async Task<ActionResult<ServiceResponse<int>>> GetSubjectCount()
        {
            var result = await _subjectService.GetSubjectCount();
            return Ok(result);
        } */
        [Authorize]
        [HttpGet] // This attribute will make the controller respond to a HTTP GET request on the route /api/User/GetPage.
        public async Task<ActionResult<RequestResponse<PagedResponse<SubjectDTO>>>> GetPage([FromQuery] PaginationSearchQueryParams pagination) // The FromQuery attribute will bind the parameters matching the names of
                                                                                                                                             // the PaginationSearchQueryParams properties to the object in the method parameter.
        {
            var currentUser = await GetCurrentUser();

            return currentUser.Result != null ?
                this.FromServiceResponse(await _subjectService.GetSubjectsPage(pagination)) :
                this.ErrorMessageResult<PagedResponse<SubjectDTO>>(currentUser.Error);
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<RequestResponse>> Add([FromBody] SubjectAddDTO subject)
        {
            var currentUser = await GetCurrentUser();

            return currentUser.Result != null ?
                this.FromServiceResponse(await _subjectService.AddSubject(subject, currentUser.Result)) :
                this.ErrorMessageResult(currentUser.Error);
        }

        [Authorize]
        [HttpPut]
        public async Task<ActionResult<RequestResponse>> Update([FromBody] SubjectUpdateDTO subject)
        {
            var currentUser = await GetCurrentUser();

            return currentUser.Result != null ?
                this.FromServiceResponse(await _subjectService.UpdateSubject(subject, currentUser.Result)) :
                this.ErrorMessageResult(currentUser.Error);
        }

        [Authorize]
        [HttpDelete("{id:guid}")]
        public async Task<ActionResult<RequestResponse>> Delete([FromRoute] Guid id)
        {
            var currentUser = await GetCurrentUser();

            return currentUser.Result != null ?
                this.FromServiceResponse(await _subjectService.DeleteSubject(id)) :
                this.ErrorMessageResult(currentUser.Error);
        }
    }
