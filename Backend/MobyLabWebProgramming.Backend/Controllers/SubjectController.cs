using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;
using MobyLabWebProgramming.Core.Responses;
using MobyLabWebProgramming.Infrastructure.Services.Implementations;


namespace MobyLabWebProgramming.Backend.Controllers;

/// <summary>
/// This is a controller example to show who to work with files and form data.
/// </summary>
[ApiController] // This attribute specifies for the framework to add functionality to the controller such as binding multipart/form-data.
[Route("api/[controller]/[action]")]
public class SubjectController : ControllerBase
    {
        private readonly ISubjectService _subjectService;

        public SubjectController(ISubjectService subjectService)
        {
            _subjectService = subjectService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ServiceResponse<Subject>>> GetSubject(Guid id)
        {
            var result = await _subjectService.GetSubject(id);
            return Ok(result);
        }

        [HttpGet]
        public async Task<ActionResult<ServiceResponse<List<Subject>>>> GetSubjects()
        {
            var result = await _subjectService.GetSubjects();
            return Ok(result);
        }

        [HttpGet("count")]
        public async Task<ActionResult<ServiceResponse<int>>> GetSubjectCount()
        {
            var result = await _subjectService.GetSubjectCount();
            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<ServiceResponse>> AddSubject([FromBody] SubjectAddDTO subject)
        {
            var result = await _subjectService.AddSubject(subject);
            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ServiceResponse>> UpdateSubject(Guid id, [FromBody] SubjectUpdateDTO subject)
        {
            subject.Id = id; // Ensure the ID from the URL matches the DTO
            var result = await _subjectService.UpdateSubject(subject);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ServiceResponse>> DeleteSubject(Guid id)
        {
            var result = await _subjectService.DeleteSubject(id);
            return Ok(result);
        }
    }
