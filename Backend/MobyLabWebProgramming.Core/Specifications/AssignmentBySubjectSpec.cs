using Ardalis.Specification;
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace MobyLabWebProgramming.Core.Specifications
{
    public sealed class AssignmentBySubjectSpec : BaseSpec<AssignmentBySubjectSpec, Assignment, AssignmentDTO>
    {
        protected override Expression<Func<Assignment, AssignmentDTO>> Spec => e => new()
        {
            Id = e.Id,
            Title = e.Title,
            Description = e.Description,
            DueDate = e.DueDate,
            SubjectId = e.SubjectId,
            // Subject = MapSubjectToDTO(e.Subject),
            // UserFiles = MapUserFilesToDTO(e.UserFiles)
        };
        public AssignmentBySubjectSpec(Guid subjectId) : base()
        {
            Query.Where(a => a.SubjectId == subjectId);
        }
    }

}
