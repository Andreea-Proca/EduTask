using System;
using System.Collections.Generic;

namespace MobyLabWebProgramming.Core.DataTransferObjects
{
    public class AssignmentDTO
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string? Description { get; set; }
        public DateTime DueDate { get; set; }
        public Guid SubjectId { get; set; }
        public SubjectDTO Subject { get; set; }
       // public ICollection<UserFileDTO>? UserFiles { get; set; } = new List<UserFileDTO>();
    }
}
