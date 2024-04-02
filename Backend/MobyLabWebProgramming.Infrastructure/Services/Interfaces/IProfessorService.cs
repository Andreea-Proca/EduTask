using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;
using MobyLabWebProgramming.Core.Errors;
using MobyLabWebProgramming.Core.Requests;
using MobyLabWebProgramming.Core.Responses;
using MobyLabWebProgramming.Core.Specifications;
using MobyLabWebProgramming.Infrastructure.Database;
using MobyLabWebProgramming.Infrastructure.Repositories.Interfaces;
using MobyLabWebProgramming.Infrastructure.Services.Interfaces;

namespace MobyLabWebProgramming.Infrastructure.Services.Implementations;

public interface IProfessorService
{
    public Task<ServiceResponse<ProfessorDTO>> GetProfessor(Guid id, CancellationToken cancellationToken = default);

   // public Task<ServiceResponse<List<Professor>>> GetProfessors(CancellationToken cancellationToken = default);

    public Task<ServiceResponse<PagedResponse<ProfessorDTO>>> GetProfessorsPage(PaginationSearchQueryParams pagination, CancellationToken cancellationToken = default);

    public Task<ServiceResponse<int>> GetProfessorCount(CancellationToken cancellationToken = default);
    public Task<ServiceResponse> AddProfessor(ProfessorAddDTO professor, UserDTO? requestingUser = default, CancellationToken cancellationToken = default);

    public Task<ServiceResponse> UpdateProfessor(ProfessorUpdateDTO professor, UserDTO? requestingUser = default, CancellationToken cancellationToken = default);

    public Task<ServiceResponse> DeleteProfessor(Guid id, UserDTO? requestingUser = default, CancellationToken cancellationToken = default);

}
