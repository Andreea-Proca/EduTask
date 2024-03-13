using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;
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
public class StudentController : AuthorizedController
{
    private readonly IStudentService _studentService;

    public StudentController(IUserService userService, IStudentService studentService) : base(userService)
    {
        _studentService = studentService;
    }

        [HttpGet("{id}")]
        public async Task<ActionResult<ServiceResponse<Student>>> GetStudent(Guid id)
        {
            var result = await _studentService.GetStudent(id);
            return Ok(result);
        }

        [HttpGet]
        public async Task<ActionResult<ServiceResponse<List<Student>>>> GetStudents()
        {
            var result = await _studentService.GetStudents();
            return Ok(result);
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<ServiceResponse>> Add([FromBody] StudentAddDTO student)
        {
           /* var result = await _studentService.AddStudent(student);
            return Ok(result);*/
        var currentUser = await GetCurrentUser();
        student.Password = PasswordUtils.HashPassword(student.Password);
        var result = await _studentService.AddStudent(student, currentUser.Result);
        return Ok(result);
        /*return currentUser.Result != null ?
            this.FromServiceResponse(await StudentService.AddStudent(student, currentUser.Result)) :
            this.ErrorMessageResult(currentUser.Error);   */
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult<ServiceResponse>> Update(Guid id, [FromBody] StudentUpdateDTO student)
        {
        /*   student.Id = id; // Ensure the ID from the URL matches the student object
           var result = await _studentService.UpdateStudent(student);
           return Ok(result);*/
        var currentUser = await GetCurrentUser();
        var result = await _studentService.UpdateStudent(student with
        {
            Password = !string.IsNullOrWhiteSpace(student.Password) ? PasswordUtils.HashPassword(student.Password) : null
        }, currentUser.Result);
        return Ok(result);
      /*  return currentUser.Result != null ?
            this.FromServiceResponse(await StudentService.UpdateStudent(student with
            {
                Password = !string.IsNullOrWhiteSpace(student.Password) ? PasswordUtils.HashPassword(student.Password) : null
            }, currentUser.Result)) :
            this.ErrorMessageResult(currentUser.Error);*/
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ServiceResponse>> DeleteStudent(Guid id)
        {
            var result = await _studentService.DeleteStudent(id);
            return Ok(result);
        }
    }
