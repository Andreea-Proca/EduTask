using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Ardalis.Specification;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace MobyLabWebProgramming.Core.Specifications
{
    public sealed class FeedbackBySubjectSpec : BaseSpec<FeedbackBySubjectSpec, Feedback, FeedbackDTO>
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
            SubjectId = e.SubjectId,
        };
        public FeedbackBySubjectSpec(Guid subjectId) : base()
        {
            Query.Where(a => a.SubjectId == subjectId);
        }
    }
}
