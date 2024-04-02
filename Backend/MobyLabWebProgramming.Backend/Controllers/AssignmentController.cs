using System;
using System.Collections.Generic;
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
    public class AssignmentController : AuthorizedController
{
        private readonly IAssignmentService _assignmentService;

        public AssignmentController(IUserService userService, IAssignmentService assignmentService) : base(userService)
        {
            _assignmentService = assignmentService;
        }

        [Authorize]
        [HttpGet("{id:guid}")]
        public async Task<ActionResult<RequestResponse<AssignmentDTO>>> GetById([FromRoute] Guid id) // The FromRoute attribute will bind the id from the route to this parameter.
        {
            var currentUser = await GetCurrentUser();

            return currentUser.Result != null ?
                this.FromServiceResponse(await _assignmentService.GetAssignment(id)) :
                this.ErrorMessageResult<AssignmentDTO>(currentUser.Error);
        }

        [Authorize]
        [HttpGet] // This attribute will make the controller respond to a HTTP GET request on the route /api/User/GetPage.
        public async Task<ActionResult<RequestResponse<PagedResponse<AssignmentDTO>>>> GetPage([FromQuery] PaginationSearchQueryParams pagination) // The FromQuery attribute will bind the parameters matching the names of
                                                                                                                                             // the PaginationSearchQueryParams properties to the object in the method parameter.
        {
            var currentUser = await GetCurrentUser();

            return currentUser.Result != null ?
                this.FromServiceResponse(await _assignmentService.GetAssignmentsPage(pagination)) :
                this.ErrorMessageResult<PagedResponse<AssignmentDTO>>(currentUser.Error);
        }

    [Authorize]
        [HttpGet("subject/{subjectId}")]
        public async Task<ActionResult<RequestResponse<List<AssignmentDTO>>>> GetAssignmentsBySubject(Guid subjectId)
        {
            var result = await _assignmentService.GetAssignmentsBySubject(subjectId);
            return Ok(result);
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<RequestResponse>> Add([FromBody] AssignmentAddDTO assignment)
        {
            var currentUser = await GetCurrentUser();

            return currentUser.Result != null ?
                this.FromServiceResponse(await _assignmentService.AddAssignment(assignment, currentUser.Result)) :
                this.ErrorMessageResult(currentUser.Error);
        }

        [Authorize]
        [HttpPut]
        public async Task<ActionResult<RequestResponse>> Update([FromBody] AssignmentUpdateDTO assignment)
        {
            var currentUser = await GetCurrentUser();

            return currentUser.Result != null ?
            this.FromServiceResponse(await _assignmentService.UpdateAssignment(assignment, currentUser.Result)) :
                this.ErrorMessageResult(currentUser.Error);
        }

        [Authorize]
        [HttpDelete("{id:guid}")]
        public async Task<ActionResult<RequestResponse>> Delete([FromRoute] Guid id)
        {
                var currentUser = await GetCurrentUser();

                return currentUser.Result != null ?
                    this.FromServiceResponse(await _assignmentService.DeleteAssignment(id)) :
                    this.ErrorMessageResult(currentUser.Error);
        }
    }
