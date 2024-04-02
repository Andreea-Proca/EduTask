using System;
using System.Collections.Generic;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
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
    public class AssignmentService : IAssignmentService
    {
        private readonly IRepository<WebAppDatabaseContext> _repository;

        public AssignmentService(IRepository<WebAppDatabaseContext> repository)
        {
            _repository = repository;
        }

        public async Task<ServiceResponse<AssignmentDTO>> GetAssignment(Guid id)
        {
            var result = await _repository.GetAsync(new AssignmentProjectionSpec(id));

            return result != null ?
                ServiceResponse<AssignmentDTO>.ForSuccess(result) :
                ServiceResponse<AssignmentDTO>.FromError(CommonErrors.AssignmentNotFound);
        }

        public async Task<ServiceResponse<List<AssignmentDTO>>> GetAssignmentsBySubject(Guid subjectId)
        {
            var result = await _repository.ListAsync(new AssignmentBySubjectSpec(subjectId));
            //var result = await _repository.ListAsync(entities => entities.SubjectId == subjectId);
            return ServiceResponse<List<AssignmentDTO>>.ForSuccess(result);
        }

        public async Task<ServiceResponse<PagedResponse<AssignmentDTO>>> GetAssignmentsPage(PaginationSearchQueryParams pagination, CancellationToken cancellationToken = default)
        {
            var result = await _repository.PageAsync(pagination, new AssignmentProjectionSpec(pagination.Search), cancellationToken); // Use the specification and pagination API to get only some entities from the database.

            return ServiceResponse<PagedResponse<AssignmentDTO>>.ForSuccess(result);
        }

        public async Task<ServiceResponse<int>> GetAssignmentCount(CancellationToken cancellationToken = default) =>
    ServiceResponse<int>.ForSuccess(await _repository.GetCountAsync<Assignment>(cancellationToken));

        public async Task<ServiceResponse> AddAssignment(AssignmentAddDTO assignmentDto, UserDTO? requestingUser, CancellationToken cancellationToken = default)
        {
            if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin && requestingUser.Role != UserRoleEnum.Professor) // Verify who can add the user, you can change this however you se fit.
            {
                return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin or professor can add assignments", ErrorCodes.CannotAdd));
            }

            var result = await _repository.GetAsync(new AssignmentSpec(assignmentDto.Title), cancellationToken);

            if (result != null)
            {
                return ServiceResponse.FromError(new(HttpStatusCode.Conflict, "The assignment already exists!", ErrorCodes.UserAlreadyExists));
            }

            // Map AssignmentDTO to Assignment entity
            var assignment = new Assignment
            {
                Title = assignmentDto.Title,
                Description = assignmentDto.Description,
                DueDate = assignmentDto.DueDate,
                SubjectId = assignmentDto.SubjectId,
                // Map other properties as needed
            };

            await _repository.AddAsync(assignment);

            return ServiceResponse.ForSuccess();
        }

        public async Task<ServiceResponse> UpdateAssignment(AssignmentUpdateDTO assignment, UserDTO? requestingUser, CancellationToken cancellationToken = default)
        {
            if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin && requestingUser.Role != UserRoleEnum.Professor) // Verify who can add the user, you can change this however you se fit.
            {
                return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin or professor can update the assignment!", ErrorCodes.CannotUpdate));
            }

            var entity = await _repository.GetAsync(new AssignmentSpec(assignment.Id), cancellationToken);

            if (entity != null) // Verify if the user is not found, you cannot update an non-existing entity.
            {
                entity.Title = assignment.Title ?? entity.Title;
                entity.Description = assignment.Description ?? entity.Description;
                entity.DueDate = assignment.DueDate;
                entity.SubjectId = assignment.SubjectId;

                await _repository.UpdateAsync(entity, cancellationToken); // Update the entity and persist the changes.
            }

            return ServiceResponse.ForSuccess();
        }

        public async Task<ServiceResponse> DeleteAssignment(Guid id, UserDTO? requestingUser = default, CancellationToken cancellationToken = default)
        {
            if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin && requestingUser.Role != UserRoleEnum.Professor) // Verify who can add the user, you can change this however you se fit.
            {
                return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin or professor can delete the assignment!", ErrorCodes.CannotDelete));
            }

            await _repository.DeleteAsync<Assignment>(id, cancellationToken);

            return ServiceResponse.ForSuccess();
        }
    }
}
