using System;
using System.Collections.Generic;
using System.Net;
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

public interface ISubjectService
{
    public Task<ServiceResponse<SubjectDTO>> GetSubject(Guid id, CancellationToken cancellationToken = default);

    public Task<ServiceResponse<List<SubjectDTO>>> GetSubjects(CancellationToken cancellationToken = default);

    public Task<ServiceResponse<PagedResponse<SubjectDTO>>> GetSubjectsPage(PaginationSearchQueryParams pagination, CancellationToken cancellationToken = default);
    public Task<ServiceResponse<int>> GetSubjectCount(CancellationToken cancellationToken = default);

    public Task<ServiceResponse> AddSubject(SubjectAddDTO subjectDto, UserDTO? requestingUser = default, CancellationToken cancellationToken = default);

    public Task<ServiceResponse> UpdateSubject(SubjectUpdateDTO subject, UserDTO? requestingUser = default, CancellationToken cancellationToken = default);

    public Task<ServiceResponse> DeleteSubject(Guid id, UserDTO? requestingUser = default, CancellationToken cancellationToken = default);
}
