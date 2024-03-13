using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MobyLabWebProgramming.Core.Entities;

    public class Blog: BaseEntity
    {
    public string Title { get; set; } = default!;
    public bool IsImportant { get; set; }

    public ICollection<Post> Posts { get; set; } = default!;
    }

