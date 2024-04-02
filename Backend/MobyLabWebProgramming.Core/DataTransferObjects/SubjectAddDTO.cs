using System;

namespace MobyLabWebProgramming.Core.DataTransferObjects
{
    public class SubjectAddDTO
    {
        public string Name { get; set; } = default!;
        public string? Description { get; set; }
        public Guid ProfessorId { get; set; }
        /*       public Guid ProfessorId { get; set; }
               public Guid StudentId { get; set; }*/
    }
}
