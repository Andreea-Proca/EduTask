using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;
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

        public async Task<ServiceResponse<Subject>> GetSubject(Guid id, CancellationToken cancellationToken = default)
        {
            var result = await _repository.GetAsync(new SubjectSpec(id), cancellationToken);

            return result != null
                ? ServiceResponse<Subject>.ForSuccess(result)
                : ServiceResponse<Subject>.FromError(CommonErrors.SubjectNotFound);
        }

        public async Task<ServiceResponse<List<Subject>>> GetSubjects(CancellationToken cancellationToken = default)
        {
            var result = await _repository.ListAsync<Subject>(new SubjectProjectionSpec(), cancellationToken);

            return ServiceResponse<List<Subject>>.ForSuccess(result);
        }

        public async Task<ServiceResponse<int>> GetSubjectCount(CancellationToken cancellationToken = default) =>
            ServiceResponse<int>.ForSuccess(await _repository.GetCountAsync<Subject>(cancellationToken));

        public async Task<ServiceResponse> AddSubject(SubjectAddDTO subject, CancellationToken cancellationToken = default)
        {
            var result = await _repository.GetAsync(new SubjectProjectionSpec(subject.Name), cancellationToken);

            if (result != null)
            {
                return ServiceResponse.FromError(new(HttpStatusCode.Conflict, "The subject already exists!", ErrorCodes.SubjectAlreadyExists));
            }

            await _repository.AddAsync(new Subject
            {
                Name = subject.Name,
                Description = subject.Description,
                ProfessorId = subject.ProfessorId,
                // Add other properties as needed
            }, cancellationToken);

            return ServiceResponse.ForSuccess();
        }

        public async Task<ServiceResponse> UpdateSubject(SubjectUpdateDTO subject, CancellationToken cancellationToken = default)
        {
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

        public async Task<ServiceResponse> DeleteSubject(Guid id, CancellationToken cancellationToken = default)
        {
            await _repository.DeleteAsync<Subject>(id, cancellationToken);

            return ServiceResponse.ForSuccess();
        }
    }
}
