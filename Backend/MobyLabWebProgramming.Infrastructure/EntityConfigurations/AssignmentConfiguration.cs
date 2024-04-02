using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MobyLabWebProgramming.Core.Entities;

namespace MobyLabWebProgramming.Infrastructure.EntityConfigurations;

public class AssignmentConfiguration : IEntityTypeConfiguration<Assignment>
{
    public void Configure(EntityTypeBuilder<Assignment> builder)
    {
       // throw new NotImplementedException();
       builder.HasKey(e => e.Id); // Here it is specifies that the property Id is the primary key.
        builder.Property(e => e.Title)
            .HasMaxLength(1023) // This specifies the maximum length for varchar type in the database.
            .IsRequired();
        builder.Property(e => e.Description)
            .HasMaxLength(65000)
            .IsRequired(false);
        builder.Property(e => e.DueDate)
            .IsRequired();
        builder.Property(e => e.CreatedAt)
            .IsRequired();
        builder.Property(e => e.UpdatedAt)
            .IsRequired();

        builder.HasOne(e => e.Subject)
            .WithMany(r => r.Assignments)
            .HasForeignKey(e => e.SubjectId)
            .HasPrincipalKey(r => r.Id)
            .OnDelete(DeleteBehavior.NoAction);
    }
}
