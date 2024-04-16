using MobyLabWebProgramming.Core.Entities;
using MobyLabWebProgramming.Core.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MobyLabWebProgramming.Core.DataTransferObjects
{
    public class FeedbackDTO
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = default!;  
        public int Rating { get; set; } = default!; // rating
        public string Comment { get; set; } = default!; // text box
        public int Attendance { get; set; } = default!; // slider
        public bool Understanding { get; set; } = default!; // checkbox
        public bool Engagement { get; set; } = default!; // checkbox
        public int AssignmentCompletion { get; set; } = default!; // radio button
        public AmountEnum Resources { get; set; } = default!; // select
        public AmountEnum Communication { get; set; } = default!; // select
        public Subject Subject { get; set; } = default!; // select
        public Guid SubjectId { get; set; } = default!;
    }
}
