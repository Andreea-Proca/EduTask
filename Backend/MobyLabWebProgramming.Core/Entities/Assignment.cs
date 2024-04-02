using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MobyLabWebProgramming.Core.Entities;

public class Assignment: BaseEntity
{
    public string Title { get; set; } = default!;
    public string? Description { get; set; }
    public DateTime DueDate { get; set; }
    public Guid SubjectId { get; set; }
    public Subject Subject { get; set; } = default!;

    //public ICollection<Student> Students { get; set; } = default!;

   public ICollection<UserFile>? UserFiles { get; set; }
}
