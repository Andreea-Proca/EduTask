using System;
using System.Linq.Expressions;
using Ardalis.Specification;
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;
using Microsoft.EntityFrameworkCore;


namespace MobyLabWebProgramming.Core.Specifications
{
    public sealed class StudentProjectionSpec : BaseSpec<StudentProjectionSpec, Student, StudentDTO>
    {
        protected override Expression<Func<Student, StudentDTO>> Spec => e => new()
        {
            Id = e.Id,
            Email = e.Email,
            Name = e.Name,
            Role = e.Role,
         /*   Subjects = MapSubjectToDTO(e.Subjects), // You might need to map Subjects to SubjectDTO here
            UserFiles = MapUserFilesToDTO(e.UserFiles) // You might need to map UserFiles to UserFileDTO here*/
        };

        private ICollection<UserFileDTO> MapUserFilesToDTO(ICollection<UserFile> userFiles)
        {
            return userFiles.Select(userFiles => new UserFileDTO
            {
                Id = userFiles.Id,
                Name = userFiles.Name,
                Description = userFiles.Description
            }).ToList();
        }

        private ICollection<SubjectDTO> MapSubjectToDTO(ICollection<Subject> subjects)
        {
            return subjects.Select(subject => new SubjectDTO
            {
                Id = subject.Id,
                Name = subject.Name,
                Description = subject.Description,
                //Assignments = subject.Assignments, // You might need to map Assignments to AssignmentDTO here
                // Professor = MapProfessorToDTO(subject.Professor), // You might need to map Professor to ProfessorDTO here
               // ProfessorId = subject.ProfessorId,
                // Students = subject.Students, // You might need to map Students to StudentDTO here
               // StudentId = subject.StudentId
            }).ToList();
        }
        public StudentProjectionSpec(bool orderByCreatedAt = true) : base(orderByCreatedAt)
        {
        }

        public StudentProjectionSpec(Guid id) : base(id)
        {
        }

        public StudentProjectionSpec(string? search)
        {
            search = !string.IsNullOrWhiteSpace(search) ? search.Trim() : null;

            if (search == null)
            {
                return;
            }

            var searchExpr = $"%{search.Replace(" ", "%")}%";

            Query.Where(e => EF.Functions.ILike(e.Name, searchExpr));
        }
    }
}
