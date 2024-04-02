using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MobyLabWebProgramming.Core.Entities;

public class StudentSubject
{
    public Guid StudentId { get; set; }
    public Student Student { get; set; } = default!;

    public Guid SubjectId { get; set; }
    public Subject Subject { get; set; } = default!;
}
