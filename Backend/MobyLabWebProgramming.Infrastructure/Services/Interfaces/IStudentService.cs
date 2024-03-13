using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;
using MobyLabWebProgramming.Core.Errors;
using MobyLabWebProgramming.Core.Requests;
using MobyLabWebProgramming.Core.Responses;
using MobyLabWebProgramming.Core.Specifications;
using MobyLabWebProgramming.Infrastructure.Database;
using MobyLabWebProgramming.Infrastructure.Repositories.Interfaces;
using MobyLabWebProgramming.Infrastructure.Services.Interfaces;

namespace MobyLabWebProgramming.Infrastructure.Services.Implementations;

public interface IStudentService
{
    public Task<ServiceResponse<Student>> GetStudent(Guid id, CancellationToken cancellationToken = default);

    public Task<ServiceResponse<List<Student>>> GetStudents(CancellationToken cancellationToken = default);

    public Task<ServiceResponse> AddStudent(StudentAddDTO student, UserDTO? requestingUser, CancellationToken cancellationToken = default);

    public Task<ServiceResponse> UpdateStudent(StudentUpdateDTO student, UserDTO? requestingUser, CancellationToken cancellationToken = default);

    public Task<ServiceResponse> DeleteStudent(Guid id, CancellationToken cancellationToken = default);

}
