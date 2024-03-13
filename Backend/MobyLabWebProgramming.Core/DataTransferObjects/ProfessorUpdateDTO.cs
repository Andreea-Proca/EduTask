using System;

namespace MobyLabWebProgramming.Core.DataTransferObjects
{
    public record ProfessorUpdateDTO(Guid Id, string? Name = default, string? Password = default);
}
