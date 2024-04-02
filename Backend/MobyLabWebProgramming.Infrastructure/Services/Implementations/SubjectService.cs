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
    public class SubjectService : ISubjectService
    {
        private readonly IRepository<WebAppDatabaseContext> _repository;

        public SubjectService(IRepository<WebAppDatabaseContext> repository)
        {
            _repository = repository;
        }

        public async Task<ServiceResponse<SubjectDTO>> GetSubject(Guid id, CancellationToken cancellationToken = default)
        {
            var result = await _repository.GetAsync(new SubjectProjectionSpec(id), cancellationToken);

            return result != null
                ? ServiceResponse<SubjectDTO>.ForSuccess(result)
                : ServiceResponse<SubjectDTO>.FromError(CommonErrors.SubjectNotFound);
        }

        /*
        public async Task<ServiceResponse<List<Subject>>> GetSubjects(CancellationToken cancellationToken = default)
        {
            var result = await _repository.ListAsync<Subject>(new SubjectProjectionSpec(), cancellationToken);

            return ServiceResponse<List<Subject>>.ForSuccess(result);
        } */

        public async Task<ServiceResponse<PagedResponse<SubjectDTO>>> GetSubjectsPage(PaginationSearchQueryParams pagination, CancellationToken cancellationToken = default)
        {
            var result = await _repository.PageAsync(pagination, new SubjectProjectionSpec(pagination.Search), cancellationToken); // Use the specification and pagination API to get only some entities from the database.

            return ServiceResponse<PagedResponse<SubjectDTO>>.ForSuccess(result);
        }

        public async Task<ServiceResponse<int>> GetSubjectCount(CancellationToken cancellationToken = default) =>
            ServiceResponse<int>.ForSuccess(await _repository.GetCountAsync<Subject>(cancellationToken));

        public async Task<ServiceResponse> AddSubject(SubjectAddDTO subjectDto, UserDTO? requestingUser, CancellationToken cancellationToken = default)
        {
            if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin && requestingUser.Role != UserRoleEnum.Professor) // Verify who can add the user, you can change this however you se fit.
            {
                return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin or professor can update the subject!", ErrorCodes.CannotUpdate));
            }

            var result = await _repository.GetAsync(new SubjectProjectionSpec(subjectDto.Name), cancellationToken);

            if (result != null)
            {
                return ServiceResponse.FromError(new(HttpStatusCode.Conflict, "The subject already exists!", ErrorCodes.SubjectAlreadyExists));
            }

            await _repository.AddAsync(new Subject
            {
                Name = subjectDto.Name,
                Description = subjectDto.Description,
                ProfessorId = subjectDto.ProfessorId,
                // Add other properties as needed
            }, cancellationToken);

            return ServiceResponse.ForSuccess();
        }

        public async Task<ServiceResponse> UpdateSubject(SubjectUpdateDTO subject, UserDTO? requestingUser, CancellationToken cancellationToken = default)
        {
            if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin && requestingUser.Role != UserRoleEnum.Professor) // Verify who can add the user, you can change this however you se fit.
            {
                return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin or professor can update the subject!", ErrorCodes.CannotUpdate));
            }

            var entity = await _repository.GetAsync(new SubjectSpec(subject.Id), cancellationToken);

            if (entity != null)
            {
                entity.Name = subject.Name ?? entity.Name;
                entity.Description = subject.Description ?? entity.Description;
                // Update other properties as needed

                await _repository.UpdateAsync(entity, cancellationToken);
            }

            return ServiceResponse.ForSuccess();
        }

        public async Task<ServiceResponse> DeleteSubject(Guid id, UserDTO? requestingUser = default, CancellationToken cancellationToken = default)
        {
            if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin && requestingUser.Role != UserRoleEnum.Professor) // Verify who can add the user, you can change this however you se fit.
            {
                return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin or professor can delete the subject!", ErrorCodes.CannotDelete));
            }

            await _repository.DeleteAsync<Subject>(id, cancellationToken);

            return ServiceResponse.ForSuccess();
        }
    }
}
