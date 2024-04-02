using System;
using System.Collections.Generic;

namespace MobyLabWebProgramming.Core.DataTransferObjects
{
    public class SubjectDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }

        public ProfessorDTO Professor { get; set; }
        //public Guid ProfessorId { get; set; }
        /*        public ICollection<AssignmentDTO> Assignments { get; set; } = new List<AssignmentDTO>();
                public ProfessorDTO Professor { get; set; }
                public Guid ProfessorId { get; set; }
                public ICollection<StudentDTO> Students { get; set; } = new List<StudentDTO>();
                public Guid StudentId { get; set; }*/
    }
}
