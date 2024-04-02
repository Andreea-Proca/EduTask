using MobyLabWebProgramming.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using Ardalis.Specification;

namespace MobyLabWebProgramming.Core.Specifications;

public sealed class StudentSpec : BaseSpec<StudentSpec, Student>
{
    public StudentSpec(Guid id) : base(id)
    {
    }

    public StudentSpec(string email)
    {
        Query.Where(e => e.Email == email);
    }
}
