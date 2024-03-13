using System;

namespace MobyLabWebProgramming.Core.DataTransferObjects
{
    public record StudentUpdateDTO(Guid Id, string? Name = default, string? Password = default);
}
