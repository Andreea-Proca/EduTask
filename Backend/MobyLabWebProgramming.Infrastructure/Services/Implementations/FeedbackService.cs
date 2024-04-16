using System;
using System.Collections.Generic;
using System.Net;
using System.Resources;
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
    public class FeedbackService : IFeedbackService
    {
        private readonly IRepository<WebAppDatabaseContext> _repository;

        public FeedbackService(IRepository<WebAppDatabaseContext> repository)
        {
            _repository = repository;
        }

        public async Task<ServiceResponse<FeedbackDTO>> GetFeedback(Guid id)
        {
            var result = await _repository.GetAsync(new FeedbackProjectionSpec(id));

            return result != null ?
                ServiceResponse<FeedbackDTO>.ForSuccess(result) :
                ServiceResponse<FeedbackDTO>.FromError(CommonErrors.FeedbackNotFound);
        }

        public async Task<ServiceResponse<List<FeedbackDTO>>> GetFeedbacksBySubject(Guid subjectId)
        {
            var result = await _repository.ListAsync(new FeedbackBySubjectSpec(subjectId));
            //var result = await _repository.ListAsync(entities => entities.SubjectId == subjectId);
            return ServiceResponse<List<FeedbackDTO>>.ForSuccess(result);
        }

        public async Task<ServiceResponse<PagedResponse<FeedbackDTO>>> GetFeedbacksPage(PaginationSearchQueryParams pagination, CancellationToken cancellationToken = default)
        {
            var result = await _repository.PageAsync(pagination, new FeedbackProjectionSpec(pagination.Search), cancellationToken); // Use the specification and pagination API to get only some entities from the database.

            return ServiceResponse<PagedResponse<FeedbackDTO>>.ForSuccess(result);
        }

        public async Task<ServiceResponse<int>> GetFeedbackCount(CancellationToken cancellationToken = default) =>
    ServiceResponse<int>.ForSuccess(await _repository.GetCountAsync<Feedback>(cancellationToken));

        public async Task<ServiceResponse> AddFeedback(FeedbackAddDTO FeedbackDto, UserDTO? requestingUser, CancellationToken cancellationToken = default)
        {
            if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin && requestingUser.Role != UserRoleEnum.Professor) // Verify who can add the user, you can change this however you se fit.
            {
                return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin or professor can add Feedbacks", ErrorCodes.CannotAdd));
            }

            /*
            var result = await _repository.GetAsync(new FeedbackSpec(FeedbackDto.Title), cancellationToken);

            if (result != null)
            {
                return ServiceResponse.FromError(new(HttpStatusCode.Conflict, "The Feedback already exists!", ErrorCodes.UserAlreadyExists));
            } */

            // Map FeedbackDTO to Feedback entity
            var feedback = new Feedback
            {
                Title = FeedbackDto.Title,
                Rating = FeedbackDto.Rating,
                Comment = FeedbackDto.Comment,
                AssignmentCompletion = FeedbackDto.AssignmentCompletion,
                Engagement = FeedbackDto.Engagement,
                Attendance = FeedbackDto.Attendance,
                Understanding = FeedbackDto.Understanding,
                Resources = FeedbackDto.Resources,
                Communication = FeedbackDto.Communication,
                SubjectId = FeedbackDto.SubjectId,
                // Map other properties as needed
            };

            await _repository.AddAsync(feedback);

            return ServiceResponse.ForSuccess();
        }

        public async Task<ServiceResponse> UpdateFeedback(FeedbackUpdateDTO FeedbackDto, UserDTO? requestingUser, CancellationToken cancellationToken = default)
        {
            if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin && requestingUser.Role != UserRoleEnum.Professor) // Verify who can add the user, you can change this however you se fit.
            {
                return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin or professor can update the Feedback!", ErrorCodes.CannotUpdate));
            }

            var entity = await _repository.GetAsync(new FeedbackSpec(FeedbackDto.Id), cancellationToken);

            if (entity != null) // Verify if the user is not found, you cannot update an non-existing entity.
            {
                entity.Title = FeedbackDto.Title ?? entity.Title;
                entity.Rating = FeedbackDto.Rating;
                entity.Comment = FeedbackDto.Comment ?? entity.Comment;
                entity.AssignmentCompletion = FeedbackDto.AssignmentCompletion;
                entity.Engagement = FeedbackDto.Engagement;
                entity.Attendance = FeedbackDto.Attendance;
                entity.Understanding = FeedbackDto.Understanding;
                entity.Resources = FeedbackDto.Resources ?? entity.Resources;
                entity.Communication = FeedbackDto.Communication ?? entity.Communication;
                entity.SubjectId = FeedbackDto.SubjectId;

                await _repository.UpdateAsync(entity, cancellationToken); // Update the entity and persist the changes.
            }

            return ServiceResponse.ForSuccess();
        }

        public async Task<ServiceResponse> DeleteFeedback(Guid id, UserDTO? requestingUser = default, CancellationToken cancellationToken = default)
        {
            if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin && requestingUser.Role != UserRoleEnum.Professor) // Verify who can add the user, you can change this however you se fit.
            {
                return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin or professor can delete the Feedback!", ErrorCodes.CannotDelete));
            }

            await _repository.DeleteAsync<Feedback>(id, cancellationToken);

            return ServiceResponse.ForSuccess();
        }
    }
}
