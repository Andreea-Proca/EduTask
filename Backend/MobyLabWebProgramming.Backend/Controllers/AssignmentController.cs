using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Responses;
using MobyLabWebProgramming.Infrastructure.Services.Interfaces;

namespace MobyLabWebProgramming.Backend.Controllers;

/// <summary>
/// This is a controller example to show who to work with files and form data.
/// </summary>
[ApiController] // This attribute specifies for the framework to add functionality to the controller such as binding multipart/form-data.
[Route("api/[controller]/[action]")]
    public class AssignmentController : ControllerBase
{
        private readonly IAssignmentService _assignmentService;

        public AssignmentController(IAssignmentService assignmentService)
        {
            _assignmentService = assignmentService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ServiceResponse<AssignmentDTO>>> GetAssignment(Guid id)
        {
            var result = await _assignmentService.GetAssignment(id);
            return Ok(result);
        }

        [HttpGet("subject/{subjectId}")]
        public async Task<ActionResult<ServiceResponse<List<AssignmentDTO>>>> GetAssignmentsBySubject(Guid subjectId)
        {
            var result = await _assignmentService.GetAssignmentsBySubject(subjectId);
            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<ServiceResponse>> AddAssignment([FromBody] AssignmentAddDTO assignmentDto)
        {
            var result = await _assignmentService.AddAssignment(assignmentDto);
            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ServiceResponse>> UpdateAssignment(Guid id, [FromBody] AssignmentUpdateDTO updatedAssignmentDto)
        {
            var result = await _assignmentService.UpdateAssignment(id, updatedAssignmentDto);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ServiceResponse>> DeleteAssignment(Guid id)
        {
            var result = await _assignmentService.DeleteAssignment(id);
            return Ok(result);
        }
    }
