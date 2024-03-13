using System.Net;

namespace MobyLabWebProgramming.Core.Errors;

/// <summary>
/// Common error messages that may be reused in various places in the code.
/// </summary>
public static class CommonErrors
{
    public static ErrorMessage UserNotFound => new(HttpStatusCode.NotFound, "User doesn't exist!", ErrorCodes.EntityNotFound);
    public static ErrorMessage FileNotFound => new(HttpStatusCode.NotFound, "File not found on disk!", ErrorCodes.PhysicalFileNotFound);
    public static ErrorMessage TechnicalSupport => new(HttpStatusCode.InternalServerError, "An unknown error occurred, contact the technical support!", ErrorCodes.TechnicalError);

    public static ErrorMessage ProfessorNotFound => new(HttpStatusCode.NotFound, "Professor doesn't exist!", ErrorCodes.EntityNotFound);
    public static ErrorMessage StudentNotFound => new(HttpStatusCode.NotFound, "Student doesn't exist!", ErrorCodes.EntityNotFound);
    public static ErrorMessage SubjectNotFound => new(HttpStatusCode.NotFound, "Subject doesn't exist!", ErrorCodes.EntityNotFound);
    public static ErrorMessage AssignmentNotFound => new(HttpStatusCode.NotFound, "Assignment doesn't exist!", ErrorCodes.EntityNotFound);
}
