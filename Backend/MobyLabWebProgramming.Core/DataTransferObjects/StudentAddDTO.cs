using System;
using MobyLabWebProgramming.Core.Enums;

namespace MobyLabWebProgramming.Core.DataTransferObjects;

public class StudentAddDTO
{
    public string Name { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public UserRoleEnum Role { get; set; } = UserRoleEnum.Student;
}