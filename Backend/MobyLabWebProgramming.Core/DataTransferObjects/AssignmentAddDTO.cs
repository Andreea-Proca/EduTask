using System;

namespace MobyLabWebProgramming.Core.DataTransferObjects
{
    public class AssignmentAddDTO
    {
        public string Title { get; set; } = default!;
        public string? Description { get; set; }
        public DateTime DueDate { get; set; }
        public Guid SubjectId { get; set; }
    }
}
