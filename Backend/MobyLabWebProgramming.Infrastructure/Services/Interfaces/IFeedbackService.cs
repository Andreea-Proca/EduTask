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

public interface IFeedbackService
{
    public Task<ServiceResponse<FeedbackDTO>> GetFeedback(Guid id);

    public Task<ServiceResponse<List<FeedbackDTO>>> GetFeedbacksBySubject(Guid subjectId);

    public Task<ServiceResponse<PagedResponse<FeedbackDTO>>> GetFeedbacksPage(PaginationSearchQueryParams pagination, CancellationToken cancellationToken = default);

    public Task<ServiceResponse<int>> GetFeedbackCount(CancellationToken cancellationToken = default);

    public Task<ServiceResponse> AddFeedback(FeedbackAddDTO FeedbackDto, UserDTO? requestingUser = default, CancellationToken cancellationToken = default);

    public Task<ServiceResponse> UpdateFeedback(FeedbackUpdateDTO FeedbackDto, UserDTO? requestingUser = default, CancellationToken cancellationToken = default);

    public Task<ServiceResponse> DeleteFeedback(Guid id, UserDTO? requestingUser = default, CancellationToken cancellationToken = default);
}
