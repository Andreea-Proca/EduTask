using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MobyLabWebProgramming.Core.Entities;

public class Subject : BaseEntity
{
    public string Name { get; set; } = default!;
    public string? Description { get; set; }
     public ICollection<Assignment> Assignments { get; set; } = default!;
    public Professor? Professor { get; set; }
    public Guid ProfessorId { get; set; }
    /*public ICollection<Student>? Students { get; set; }
    public Guid StudentId { get; set; }*/

    public ICollection<Student> Students { get; set; } = default!;
    public ICollection<StudentSubject> StudentSubjects { get; set; } = default!;

    /*    public Guid ProfessorId { get; set; }
        public Professor Professor { get; set; } = default!;

        public ICollection<Student> Students { get; set; } = default!;

        public Guid StudentId { get; set; }*/

}
