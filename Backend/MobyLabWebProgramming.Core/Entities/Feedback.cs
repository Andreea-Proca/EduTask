using MobyLabWebProgramming.Core.Enums;

namespace MobyLabWebProgramming.Core.Entities;

/// <summary>
/// This is an example for a user entity, it will be mapped to a single table and each property will have it's own column except for entity object references also known as navigation properties.
/// </summary>
public class Feedback : BaseEntity
{
    public string Title { get; set; } = default!;
    public int Rating { get; set; } = default!; // rating
    public string Comment { get; set; } = default!; // text box
    public int Attendance { get; set; } = default!; // slider
    public bool Understanding { get; set; } = default!; // checkbox
    public bool Engagement { get; set; } = default!; // checkbox
    public int AssignmentCompletion { get; set; } = default!; // radio button
    public AmountEnum Resources{ get; set; } = default!; // select
    public AmountEnum Communication { get; set; } = default!; // select
    public Subject Subject { get; set; } = default!; // select
    public Guid SubjectId { get; set; } = default;
}
