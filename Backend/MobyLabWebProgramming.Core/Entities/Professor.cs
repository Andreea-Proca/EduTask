using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MobyLabWebProgramming.Core.Entities;

public class Professor : User
{ 
    public ICollection<Subject>? Subjects { get; set; } = default!;

/*    public ICollection<Student>? Students { get; set; }
    public Guid StudentId { get; set; }*/

    // public ICollection<Assignment> Assignments { get; set; } = default!;

    /*    public User User { get; set; } = default!;

        public Guid UserId { get; set; }
    */

/*    public User User { get; set; } = default!;
    public Guid UserId { get; set; }*/
}
