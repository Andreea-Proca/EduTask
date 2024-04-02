using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;
using MobyLabWebProgramming.Core.Errors;
using MobyLabWebProgramming.Core.Requests;
using MobyLabWebProgramming.Core.Responses;
using MobyLabWebProgramming.Core.Specifications;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MobyLabWebProgramming.Infrastructure.Services.Interfaces;

public interface IAssignmentService
{
public  Task<ServiceResponse<AssignmentDTO>> GetAssignment(Guid id);

public  Task<ServiceResponse<List<AssignmentDTO>>> GetAssignmentsBySubject(Guid subjectId);

public Task<ServiceResponse<PagedResponse<AssignmentDTO>>> GetAssignmentsPage(PaginationSearchQueryParams pagination, CancellationToken cancellationToken = default);

public Task<ServiceResponse<int>> GetAssignmentCount(CancellationToken cancellationToken = default);

public  Task<ServiceResponse> AddAssignment(AssignmentAddDTO assignmentDto, UserDTO? requestingUser = default, CancellationToken cancellationToken = default);

public  Task<ServiceResponse> UpdateAssignment(AssignmentUpdateDTO assignment, UserDTO? requestingUser = default, CancellationToken cancellationToken = default);

public  Task<ServiceResponse> DeleteAssignment(Guid id, UserDTO? requestingUser = default, CancellationToken cancellationToken = default);  
}
