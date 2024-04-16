using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using MobyLabWebProgramming.Core.Entities;

namespace MobyLabWebProgramming.Infrastructure.EntityConfigurations;
public class FeedbackConfiguration : IEntityTypeConfiguration<Feedback>
{
    public void Configure(EntityTypeBuilder<Feedback> builder)
    {
        builder.HasKey(e => e.Id); // Here it is specifies that the property Id is the primary key.
        builder.Property(e => e.Title)
            .IsRequired();
        builder.Property(e => e.Rating)
            //.HasMaxLength(1023) // This specifies the maximum length for varchar type in the database.
            .IsRequired();
        builder.Property(e => e.Comment)
            .HasMaxLength(65000)
            .IsRequired(false);
        builder.Property(e => e.Attendance)
           .IsRequired();
        builder.Property(e => e.Understanding)
           .IsRequired();
        builder.Property(e => e.Engagement)
           .IsRequired();
        builder.Property(e => e.AssignmentCompletion)
           .IsRequired();
        builder.Property(e => e.Resources)
           .IsRequired();
        builder.Property(e => e.Communication)
           .IsRequired();
        builder.Property(e => e.CreatedAt)
            .IsRequired();
        builder.Property(e => e.UpdatedAt)
            .IsRequired();

        builder.HasOne(e => e.Subject)
            .WithMany(r => r.Feedbacks)
            .HasForeignKey(e => e.SubjectId)
            .HasPrincipalKey(r => r.Id)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
