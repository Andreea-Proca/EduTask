using System;
using System.Collections.Generic;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
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

namespace MobyLabWebProgramming.Infrastructure.Services.Implementations
{
    public class ProfessorService : IProfessorService
    {
        private readonly IRepository<WebAppDatabaseContext> _repository;
        private readonly ILoginService _loginService;
        private readonly IMailService _mailService;

        public ProfessorService(IRepository<WebAppDatabaseContext> repository, ILoginService loginService, IMailService mailService)
        {
            _repository = repository;
            _loginService = loginService;
            _mailService = mailService;
        }

        public async Task<ServiceResponse<Professor>> GetProfessor(Guid id, CancellationToken cancellationToken = default)
        {
            var result = await _repository.GetAsync(new ProfessorSpec(id), cancellationToken);

            return result != null ?
                ServiceResponse<Professor>.ForSuccess(result) :
                ServiceResponse<Professor>.FromError(CommonErrors.ProfessorNotFound);
        }

        public async Task<ServiceResponse<List<Professor>>> GetProfessors( CancellationToken cancellationToken = default)
        {
            var result = await _repository.ListAsync<Professor>(new ProfessorProjectionSpec(), cancellationToken);

            return ServiceResponse<List<Professor>>.ForSuccess(result);
        }

        public async Task<ServiceResponse> AddProfessor(ProfessorAddDTO student, UserDTO? requestingUser, CancellationToken cancellationToken = default)
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

            await _repository.AddAsync(new Professor
            {
                Email = student.Email,
                Name = student.Name,
                Role = student.Role,
                Password = student.Password
            }, cancellationToken);

            await _mailService.SendMail(student.Email, "Welcome!", MailTemplates.UserAddTemplate(student.Name), true, "My App", cancellationToken); // You can send a notification on the user email. Change the email if you want.

            return ServiceResponse.ForSuccess();
        }

        public async Task<ServiceResponse> UpdateProfessor(ProfessorUpdateDTO student, UserDTO? requestingUser, CancellationToken cancellationToken = default)
        {
            /*            var existingProfessor = await _repository.GetAsync(new ProfessorSpec(professor.Id), cancellationToken);

                        if (existingProfessor != null)
                        {
                            // Update professor properties as needed
                            await _repository.UpdateAsync(existingProfessor, cancellationToken);
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

        public async Task<ServiceResponse> DeleteProfessor(Guid id, CancellationToken cancellationToken = default)
        {
            await _repository.DeleteAsync<Professor>(id, cancellationToken);

            return ServiceResponse.ForSuccess();
        }
    }
}
