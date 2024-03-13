using MobyLabWebProgramming.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace MobyLabWebProgramming.Core.Specifications;

public sealed class ProfessorSpec : BaseSpec<ProfessorSpec, Professor>
{
    public ProfessorSpec(Guid id) : base(id)
    {
    }

    /*    public UserSpec(string email)
        {
            Query.Where(e => e.Email == email);
        }*/
}
