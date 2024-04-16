using Ardalis.Specification;
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace MobyLabWebProgramming.Core.Specifications
{
    public sealed class FeedbackProjectionSpec : BaseSpec<FeedbackProjectionSpec, Feedback, FeedbackDTO>
    {
        protected override Expression<Func<Feedback, FeedbackDTO>> Spec => e => new()
        {
            Id = e.Id,
            Title = e.Title,
            Rating = e.Rating,
            Comment = e.Comment,
            AssignmentCompletion = e.AssignmentCompletion,
            Engagement = e.Engagement,
            Attendance = e.Attendance,
            Understanding = e.Understanding,
            Resources = e.Resources,
            Communication = e.Communication,
            Subject = new()
            {
                Id = e.Subject.Id,
                Name = e.Subject.Name,
                Description = e.Subject.Description
            },
        };

        public FeedbackProjectionSpec(bool orderByCreatedAt = true) : base(orderByCreatedAt)
        {
        }

        public FeedbackProjectionSpec(Guid id) : base(id)
        {
        }

        public FeedbackProjectionSpec(string? search)
        {
            search = !string.IsNullOrWhiteSpace(search) ? search.Trim() : null;

            if (search == null)
            {
                return;
            }

            var searchExpr = $"%{search.Replace(" ", "%")}%";

            Query.Where(e => EF.Functions.ILike(e.Title, searchExpr));
        }
    }
}
