using System;
using System.Linq.Expressions;
using Ardalis.Specification;
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;
using Microsoft.EntityFrameworkCore;


namespace MobyLabWebProgramming.Core.Specifications
{
    public sealed class SubjectProjectionSpec : BaseSpec<SubjectProjectionSpec, Subject, SubjectDTO>
    {
        protected override Expression<Func<Subject, SubjectDTO>> Spec => e => new()
        {
            Id = e.Id,
            Name = e.Name,
            Description = e.Description,
            Professor = new()
            {
                Id = e.Professor.Id,
                Email = e.Professor.Email,
                Name = e.Professor.Name,
                Role = e.Professor.Role
            },
            // Assignments = MapAssignmentToDTO(e.Assignments), // You might need to map Assignments to AssignmentDTO here
            // Professor = MapProfessorToDTO(e.Professor), // You might need to map Professor to ProfessorDTO here
            // ProfessorId = e.ProfessorId,
            // Students = MapStudentToDTO(e.Students), // You might need to map Students to StudentDTO here
            // StudentId = e.StudentId
        };

        private ICollection<AssignmentDTO> MapAssignmentToDTO(ICollection<Assignment> assignments)
        {
            return assignments.Select(assignment => new AssignmentDTO
            {
                Id = assignment.Id,
                Title = assignment.Title,
                Description = assignment.Description,
                DueDate = assignment.DueDate,
                //SubjectId = assignment.SubjectId
            }).ToList();
        }   

        private ICollection<StudentDTO> MapStudentToDTO(ICollection<Student> student)
        {
            return student.Select(student => new StudentDTO
            {
                Id = student.Id,
                Name = student.Name,
                Email = student.Email,
                /*CreatedAt = student.CreatedAt,
                 *                 *                UpdatedAt = student.UpdatedAt*/
            }).ToList();
        }

        private static ProfessorDTO MapProfessorToDTO(Professor professor)
        {
            return new ProfessorDTO
            {
                Id = professor.Id,
                Name = professor.Name,
                Email = professor.Email,
               /* CreatedAt = professor.CreatedAt,
                UpdatedAt = professor.UpdatedAt*/
            };
        }
        public SubjectProjectionSpec(bool orderByCreatedAt = true) : base(orderByCreatedAt)
        {
        }

        public SubjectProjectionSpec(Guid id) : base(id)
        {
        }

        public SubjectProjectionSpec(string? search)
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
