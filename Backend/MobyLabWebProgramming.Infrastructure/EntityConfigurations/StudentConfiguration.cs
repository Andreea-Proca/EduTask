using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MobyLabWebProgramming.Core.Entities;

namespace MobyLabWebProgramming.Infrastructure.EntityConfigurations;

public class StudentConfiguration : IEntityTypeConfiguration<Student>
{
    public void Configure(EntityTypeBuilder<Student> builder)
    {
        //builder.HasKey(e => e.Id); // Here it is specifies that the property Id is the primary key. 
/*        builder.Property(e => e.Name)
            .HasMaxLength(255) // This specifies the maximum length for varchar type in the database.
            .IsRequired();
        builder.Property(e => e.Email)
            .HasMaxLength(255)
            .IsRequired();
       // builder.HasAlternateKey(e => e.Email); // Here it is specifies that the property Email is a unique key.
        builder.Property(e => e.Password)
            .HasMaxLength(255)
            .IsRequired();
            builder.Property(e => e.Role)
            .HasMaxLength(255)      
            .IsRequired();    
        builder.Property(e => e.CreatedAt)      
            .IsRequired();  
        builder.Property(e => e.UpdatedAt)
            .IsRequired();*/

        builder.HasMany(e => e.Subjects)
             .WithMany(r => r.Students);
        //.HasForeignKey(e => e.SubjectId)
        // .HasPrincipalKey(r => r.Id)
        //.OnDelete(DeleteBehavior.Cascade);

  /*      builder.HasMany(e => e.Professors)
     .WithMany(r => r.Students);*/

        /*    builder.HasMany(s => s.UserFiles)
                    .WithOne(uf => uf.Student)
                    .HasForeignKey(uf => uf.StudentId)
                    .OnDelete(DeleteBehavior.NoAction);*/
/*        builder.HasOne(e => e.User)
            .WithOne(u => u.Student)
            .HasForeignKey<Student>(e => e.UserId)
            .OnDelete(DeleteBehavior.NoAction);*/
    }
}
