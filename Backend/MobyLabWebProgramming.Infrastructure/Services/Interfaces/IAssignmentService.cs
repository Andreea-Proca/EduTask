using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;
using MobyLabWebProgramming.Core.Errors;
using MobyLabWebProgramming.Core.Responses;
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


public  Task<ServiceResponse> AddAssignment(AssignmentAddDTO assignmentDto);

public  Task<ServiceResponse> UpdateAssignment(Guid id, AssignmentUpdateDTO updatedAssignmentDto);

public  Task<ServiceResponse> DeleteAssignment(Guid id);  
}
