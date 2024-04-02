using Ardalis.Specification;
using MobyLabWebProgramming.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace MobyLabWebProgramming.Core.Specifications;

public sealed class AssignmentSpec : BaseSpec<AssignmentSpec, Assignment>
{
    public AssignmentSpec(Guid id) : base(id)
    {
    }

        public AssignmentSpec(string title)
        {
            Query.Where(e => e.Title == title);
        }
}
