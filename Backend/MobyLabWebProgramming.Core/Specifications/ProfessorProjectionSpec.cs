using System;
using System.Linq.Expressions;
using Ardalis.Specification;
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;
using MobyLabWebProgramming.Core.Enums;
using Microsoft.EntityFrameworkCore;


namespace MobyLabWebProgramming.Core.Specifications
{
    public sealed class ProfessorProjectionSpec : BaseSpec<ProfessorProjectionSpec, Professor, ProfessorDTO>
    {
        protected override Expression<Func<Professor, ProfessorDTO>> Spec => e => new()
        {
            Id = e.Id,
            Email = e.Email,
            Name = e.Name,
            Role = e.Role,
            //Subjects = MapSubjectToDTO(e.Subjects)
        };
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

        public ProfessorProjectionSpec(bool orderByCreatedAt = true) : base(orderByCreatedAt)
        {
        }

        public ProfessorProjectionSpec(Guid id) : base(id)
        {
        }

        public ProfessorProjectionSpec(string? search)
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
