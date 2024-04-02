using MailKit;
using MobyLabWebProgramming.Core.Constants;
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;
using MobyLabWebProgramming.Core.Enums;
using MobyLabWebProgramming.Core.Errors;
using MobyLabWebProgramming.Core.Requests;
using MobyLabWebProgramming.Core.Responses;
using MobyLabWebProgramming.Core.Specifications;
using MobyLabWebProgramming.Infrastructure.Database;
using MobyLabWebProgramming.Infrastructure.Repositories.Interfaces;
using MobyLabWebProgramming.Infrastructure.Services.Interfaces;
using System.Net;


namespace MobyLabWebProgramming.Infrastructure.Services.Implementations
{
    public class StudentService : IStudentService
    {
        private readonly IRepository<WebAppDatabaseContext> _repository;
        private readonly ILoginService _loginService;
        private readonly Interfaces.IMailService _mailService;

        public StudentService(IRepository<WebAppDatabaseContext> repository, ILoginService loginService, Interfaces.IMailService mailService)
        {
            _repository = repository;
            _loginService = loginService;
            _mailService = mailService;
        }

        public async Task<ServiceResponse<StudentDTO>> GetStudent(Guid id, CancellationToken cancellationToken = default)
        {
            var result = await _repository.GetAsync(new StudentProjectionSpec(id), cancellationToken);

            return result != null ?
                ServiceResponse<StudentDTO>.ForSuccess(result) :
                ServiceResponse<StudentDTO>.FromError(CommonErrors.StudentNotFound);
        }
        /*
        public async Task<ServiceResponse<List<Student>>> GetStudents(CancellationToken cancellationToken = default)
        {
            var result = await _repository.ListAsync<Student>(new StudentProjectionSpec(), cancellationToken);

            return ServiceResponse<List<Student>>.ForSuccess(result);
        } */

        public async Task<ServiceResponse<PagedResponse<StudentDTO>>> GetStudentsPage(PaginationSearchQueryParams pagination, CancellationToken cancellationToken = default)
        {
            var result = await _repository.PageAsync(pagination, new StudentProjectionSpec(pagination.Search), cancellationToken); // Use the specification and pagination API to get only some entities from the database.

            return ServiceResponse<PagedResponse<StudentDTO>>.ForSuccess(result);
        }

        public async Task<ServiceResponse<int>> GetStudentCount(CancellationToken cancellationToken = default) =>
    ServiceResponse<int>.ForSuccess(await _repository.GetCountAsync<Student>(cancellationToken)); // Get the count of all user entities in the database.

        public async Task<ServiceResponse> AddStudent(StudentAddDTO student, UserDTO? requestingUser, CancellationToken cancellationToken = default)
        {
            if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin) // Verify who can add the user, you can change this however you se fit.
            {
                return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin can add users!", ErrorCodes.CannotAdd));
            }

            var result = await _repository.GetAsync(new UserSpec(student.Email), cancellationToken);

            if (result != null)
            {
                return ServiceResponse.FromError(new(HttpStatusCode.Conflict, "The user already exists!", ErrorCodes.UserAlreadyExists));
            }

            await _repository.AddAsync(new Student
            {
                Email = student.Email,
                Name = student.Name,
                Role = student.Role,
                Password = student.Password
            }, cancellationToken);

            await _mailService.SendMail(student.Email, "Welcome!", MailTemplates.UserAddTemplate(student.Name), true, "My App", cancellationToken); // You can send a notification on the user email. Change the email if you want.

            return ServiceResponse.ForSuccess();
        }

        public async Task<ServiceResponse> UpdateStudent(StudentUpdateDTO student, UserDTO? requestingUser, CancellationToken cancellationToken = default)
        {
            if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin && requestingUser.Id != student.Id) // Verify who can add the user, you can change this however you se fit.
            {
                return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin or the own user can update the user!", ErrorCodes.CannotUpdate));
            }

            var entity = await _repository.GetAsync(new UserSpec(student.Id), cancellationToken);

            if (entity != null) // Verify if the user is not found, you cannot update an non-existing entity.
            {
                entity.Name = student.Name ?? entity.Name;
                entity.Password = student.Password ?? entity.Password;

                await _repository.UpdateAsync(entity, cancellationToken); // Update the entity and persist the changes.
            }

            return ServiceResponse.ForSuccess();
        }

        public async Task<ServiceResponse> DeleteStudent(Guid id, UserDTO? requestingUser = default, CancellationToken cancellationToken = default)
        {
            if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin && requestingUser.Id != id) // Verify who can add the user, you can change this however you se fit.
            {
                return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin or the own user can delete the user!", ErrorCodes.CannotDelete));
            }

            await _repository.DeleteAsync<Student>(id, cancellationToken);

            return ServiceResponse.ForSuccess();
        }
    }
}
