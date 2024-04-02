using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MobyLabWebProgramming.Core.Entities;
    public class Post : BaseEntity
{
    public string Title { get; set; } = default!;
    public string Description { get; set; }

    public Guid BlogId { get; set; }
    public Blog Blog { get; set; } = default!;
}
