using System;
using System.Collections.Generic;
using MobyLabWebProgramming.Core.Entities;
using MobyLabWebProgramming.Core.Enums;

namespace MobyLabWebProgramming.Core.DataTransferObjects;

public class ProfessorDTO
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public UserRoleEnum Role { get; set; }

    public DateTime CreatedAt { get; set; }
    // public ICollection<SubjectDTO> Subjects { get; set; } = new List<SubjectDTO>();
}
