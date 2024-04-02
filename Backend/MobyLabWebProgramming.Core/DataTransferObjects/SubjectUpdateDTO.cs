using System;

namespace MobyLabWebProgramming.Core.DataTransferObjects
{
    public class SubjectUpdateDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public Guid ProfessorId { get; set; }
       // public Guid StudentId { get; set; }
    }
}
