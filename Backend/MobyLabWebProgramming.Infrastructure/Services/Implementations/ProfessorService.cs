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

        public async Task<ServiceResponse<ProfessorDTO>> GetProfessor(Guid id, CancellationToken cancellationToken = default)
        {
            var result = await _repository.GetAsync(new ProfessorProjectionSpec(id), cancellationToken);

            return result != null ?
                ServiceResponse<ProfessorDTO>.ForSuccess(result) :
                ServiceResponse<ProfessorDTO>.FromError(CommonErrors.ProfessorNotFound);
        }
        /*
        public async Task<ServiceResponse<List<ProfessorDTO>>> GetProfessors( CancellationToken cancellationToken = default)
        {
            var result = await _repository.ListAsync<ProfessorDTO>(new ProfessorProjectionSpec(), cancellationToken);

            return ServiceResponse<List<ProfessorDTO>>.ForSuccess(result);
        } */

        public async Task<ServiceResponse<PagedResponse<ProfessorDTO>>> GetProfessorsPage(PaginationSearchQueryParams pagination, CancellationToken cancellationToken = default)
        {
            var result = await _repository.PageAsync(pagination, new ProfessorProjectionSpec(pagination.Search), cancellationToken); // Use the specification and pagination API to get only some entities from the database.

            return ServiceResponse<PagedResponse<ProfessorDTO>>.ForSuccess(result);
        }

        public async Task<ServiceResponse<int>> GetProfessorCount(CancellationToken cancellationToken = default) =>
    ServiceResponse<int>.ForSuccess(await _repository.GetCountAsync<Professor>(cancellationToken)); // Get the count of all user entities in the database.

        public async Task<ServiceResponse> AddProfessor(ProfessorAddDTO professor, UserDTO? requestingUser, CancellationToken cancellationToken = default)
        {
            if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin) // Verify who can add the user, you can change this however you se fit.
            {
                return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin can add users!", ErrorCodes.CannotAdd));
            }

            var result = await _repository.GetAsync(new UserSpec(professor.Email), cancellationToken);

            if (result != null)
            {
                return ServiceResponse.FromError(new(HttpStatusCode.Conflict, "The user already exists!", ErrorCodes.UserAlreadyExists));
            }

            await _repository.AddAsync(new Professor
            {
                Email = professor.Email,
                Name = professor.Name,
                Role = professor.Role,
                Password = professor.Password
            }, cancellationToken);

            await _mailService.SendMail(professor.Email, "Welcome!", MailTemplates.UserAddTemplate(professor.Name), true, "My App", cancellationToken); // You can send a notification on the user email. Change the email if you want.

            return ServiceResponse.ForSuccess();
        }

        public async Task<ServiceResponse> UpdateProfessor(ProfessorUpdateDTO professor, UserDTO? requestingUser, CancellationToken cancellationToken = default)
        {
            if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin && requestingUser.Id != professor.Id) // Verify who can add the user, you can change this however you se fit.
            {
                return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin or the own user can update the user!", ErrorCodes.CannotUpdate));
            }

            var entity = await _repository.GetAsync(new ProfessorSpec(professor.Id), cancellationToken);

            if (entity != null) // Verify if the user is not found, you cannot update an non-existing entity.
            {
                entity.Name = professor.Name ?? entity.Name;
                entity.Password = professor.Password ?? entity.Password;

                await _repository.UpdateAsync(entity, cancellationToken); // Update the entity and persist the changes.
            }

            return ServiceResponse.ForSuccess();
        }

        public async Task<ServiceResponse> DeleteProfessor(Guid id, UserDTO? requestingUser = default, CancellationToken cancellationToken = default)
        {

            if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin && requestingUser.Id != id) // Verify who can add the user, you can change this however you se fit.
            {
                return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin or the own user can delete the user!", ErrorCodes.CannotDelete));
            }

            await _repository.DeleteAsync<Professor>(id, cancellationToken);

            return ServiceResponse.ForSuccess();
        }
    }
}
