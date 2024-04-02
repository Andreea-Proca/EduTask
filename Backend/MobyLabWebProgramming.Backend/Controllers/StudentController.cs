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
public class StudentController : AuthorizedController
{
    private readonly IStudentService _studentService;

    public StudentController(IUserService userService, IStudentService studentService) : base(userService)
    {
        _studentService = studentService;
    }

        [Authorize]    
        [HttpGet("{id:guid}")]
        public async Task<ActionResult<RequestResponse<StudentDTO>>> GetById([FromRoute] Guid id)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _studentService.GetStudent(id)) :
            this.ErrorMessageResult<StudentDTO>(currentUser.Error);

        //var result = await _studentService.GetStudent(id);
            //return Ok(result);
        }

    /*
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<ServiceResponse<List<Student>>>> GetStudents()
        {
            var result = await _studentService.GetStudentsPage();
            return Ok(result);
        } */

    [Authorize]
    [HttpGet] // This attribute will make the controller respond to a HTTP GET request on the route /api/User/GetPage.
    public async Task<ActionResult<RequestResponse<PagedResponse<StudentDTO>>>> GetPage([FromQuery] PaginationSearchQueryParams pagination) // The FromQuery attribute will bind the parameters matching the names of
                                                                                                                                         // the PaginationSearchQueryParams properties to the object in the method parameter.
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _studentService.GetStudentsPage(pagination)) :
            this.ErrorMessageResult<PagedResponse<StudentDTO>>(currentUser.Error);
    }

    [Authorize]
        [HttpPost]
        public async Task<ActionResult<RequestResponse>> Add([FromBody] StudentAddDTO student)
        {
            var currentUser = await GetCurrentUser();
            student.Password = PasswordUtils.HashPassword(student.Password);

            return currentUser.Result != null ?
                this.FromServiceResponse(await _studentService.AddStudent(student, currentUser.Result)) :
                this.ErrorMessageResult(currentUser.Error);
        }

        [Authorize]
        [HttpPut]
        public async Task<ActionResult<RequestResponse>> Update([FromBody] StudentUpdateDTO student)
        {
            var currentUser = await GetCurrentUser();

            return currentUser.Result != null ?
                this.FromServiceResponse(await _studentService.UpdateStudent(student with
                {
                    Password = !string.IsNullOrWhiteSpace(student.Password) ? PasswordUtils.HashPassword(student.Password) : null
                }, currentUser.Result)) :
                this.ErrorMessageResult(currentUser.Error);
        }

        [Authorize] // You need to use this attribute to protect the route access, it will return a Forbidden status code if the JWT is not present or invalid, and also it will decode the JWT token.
        [HttpDelete("{id:guid}")]
        public async Task<ActionResult<RequestResponse>> Delete([FromRoute] Guid id)
        {
            var currentUser = await GetCurrentUser();

            return currentUser.Result != null ?
                this.FromServiceResponse(await _studentService.DeleteStudent(id)) :
                this.ErrorMessageResult(currentUser.Error);
        }
    }
