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

        public async Task<ServiceResponse<Student>> GetStudent(Guid id, CancellationToken cancellationToken = default)
        {
            var result = await _repository.GetAsync(new StudentSpec(id), cancellationToken);

            return result != null ?
                ServiceResponse<Student>.ForSuccess(result) :
                ServiceResponse<Student>.FromError(CommonErrors.StudentNotFound);
        }

        public async Task<ServiceResponse<List<Student>>> GetStudents(CancellationToken cancellationToken = default)
        {
            var result = await _repository.ListAsync<Student>(new StudentProjectionSpec(), cancellationToken);

            return ServiceResponse<List<Student>>.ForSuccess(result);
        }

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
           /* var existingStudent = await _repository.GetAsync(new StudentSpec(student.Id), cancellationToken);

            if (existingStudent != null)
            {
                // Update student properties as needed
                await _repository.UpdateAsync(existingStudent, cancellationToken);
            }

            return ServiceResponse.ForSuccess();*/

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

        public async Task<ServiceResponse> DeleteStudent(Guid id, CancellationToken cancellationToken = default)
        {
            await _repository.DeleteAsync<Student>(id, cancellationToken);

            return ServiceResponse.ForSuccess();
        }
    }
}
