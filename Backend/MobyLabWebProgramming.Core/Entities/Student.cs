using MobyLabWebProgramming.Core.DataTransferObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MobyLabWebProgramming.Core.Entities;
public class Student : User
{
     
   // public Student() { }

    public ICollection<Subject> Subjects { get; set; } = default!;
    public ICollection<StudentSubject> StudentSubjects { get; set; } = default!;

    // public ICollection<Subject> Subjects { get; set; } = new List<Subject>();
    // public ICollection<StudentSubject> StudentSubjects { get; set; } = new List<StudentSubject>();

    // public ICollection<UserFile>? UserFiles { get; set; } = default!;

    /*    public ICollection<Professor>? Professors { get; set; }
        public Guid ProfessorId { get; set; }*/

    /*    internal object Select(Func<object, StudentDTO> value)
        {
            throw new NotImplementedException();
        }*/


    /*   public ICollection<Submission> Submissions { get; set; } = default!;

       public ICollection<Assignment> Assignments { get; set; } = default!;*/

    /*    public User User { get; set; } = default!;
        public Guid UserId { get; set; }*/

}

