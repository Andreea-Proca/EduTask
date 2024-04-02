using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using MobyLabWebProgramming.Core.Entities;

namespace MobyLabWebProgramming.Infrastructure.EntityConfigurations;
public class PostConfiguration : IEntityTypeConfiguration<Post>
{
    public void Configure(EntityTypeBuilder<Post> builder)
    {
        builder.HasKey(e => e.Id); // Here it is specifies that the property Id is the primary key.
        builder.Property(e => e.Title)
            .HasMaxLength(1023) // This specifies the maximum length for varchar type in the database.
            .IsRequired();
        builder.Property(e => e.Description)
            .HasMaxLength(65000)
            .IsRequired(false);
        builder.Property(e => e.CreatedAt)
            .IsRequired();
        builder.Property(e => e.UpdatedAt)
            .IsRequired();

        builder.HasOne(e => e.Blog)
            .WithMany(r => r.Posts)
            .HasForeignKey(e => e.BlogId)
            .HasPrincipalKey(r => r.Id)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
