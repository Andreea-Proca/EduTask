using Ardalis.Specification;
using MobyLabWebProgramming.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace MobyLabWebProgramming.Core.Specifications;

public sealed class SubjectSpec : BaseSpec<SubjectSpec, Subject>
{
    public SubjectSpec(Guid id) : base(id)
    {
    }
    public SubjectSpec(string name)
    {
        Query.Where(e => e.Name == name);
    }
}
