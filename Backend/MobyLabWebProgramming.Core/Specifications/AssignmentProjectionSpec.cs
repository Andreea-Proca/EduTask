using System;
using System.Linq.Expressions;
using Ardalis.Specification;
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;
using Microsoft.EntityFrameworkCore;


namespace MobyLabWebProgramming.Core.Specifications
{
    public sealed class AssignmentProjectionSpec : BaseSpec<AssignmentProjectionSpec, Assignment, AssignmentDTO>
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

        private SubjectDTO MapSubjectToDTO(Subject subject)
        {
            return new SubjectDTO
            {
                Id = subject.Id,
                Name = subject.Name,
                Description = subject.Description,
                //Assignments = subject.Assignments, // You might need to map Assignments to AssignmentDTO here
                // Professor = MapProfessorToDTO(subject.Professor), // You might need to map Professor to ProfessorDTO here
               // ProfessorId = subject.ProfessorId,
                // Students = subject.Students, // You might need to map Students to StudentDTO here
              //  StudentId = subject.StudentId
            };
        }


        private ICollection<UserFileDTO> MapUserFilesToDTO(ICollection<UserFile> userFiles)
        {
            return userFiles.Select(userFiles => new UserFileDTO
            {
                Id = userFiles.Id,
                Name = userFiles.Name,
                Description = userFiles.Description
            }).ToList();
        }

        public AssignmentProjectionSpec(bool orderByCreatedAt = true) : base(orderByCreatedAt)
        {
        }

        public AssignmentProjectionSpec(Guid id) : base(id)
        {
        }

        public AssignmentProjectionSpec(string? search)
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
