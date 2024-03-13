using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;
using MobyLabWebProgramming.Core.Errors;
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

        public async Task<ServiceResponse> AddAssignment(AssignmentAddDTO assignmentDto)
        {
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

        public async Task<ServiceResponse> UpdateAssignment(Guid id, AssignmentUpdateDTO updatedAssignmentDto)
        {
            var assignment = await _repository.GetAsync(new AssignmentSpec(id));

            if (assignment == null)
            {
                return ServiceResponse.FromError(CommonErrors.AssignmentNotFound);
            }

            // Update Assignment properties
            assignment.Title = updatedAssignmentDto.Title;
            assignment.Description = updatedAssignmentDto.Description;
            assignment.DueDate = updatedAssignmentDto.DueDate;
            assignment.SubjectId = updatedAssignmentDto.SubjectId;
            // Update other properties as needed

            await _repository.UpdateAsync(assignment);

            return ServiceResponse.ForSuccess();
        }

        public async Task<ServiceResponse> DeleteAssignment(Guid id)
        {
            await _repository.DeleteAsync<Assignment>(id);

            return ServiceResponse.ForSuccess();
        }
    }
}
