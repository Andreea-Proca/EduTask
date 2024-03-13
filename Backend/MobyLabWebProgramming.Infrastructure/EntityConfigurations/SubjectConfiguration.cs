using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MobyLabWebProgramming.Core.Entities;

namespace MobyLabWebProgramming.Infrastructure.EntityConfigurations;

public class SubjectConfiguration : IEntityTypeConfiguration<Subject>
{
    public void Configure(EntityTypeBuilder<Subject> builder)
    {
        builder.HasKey(e => e.Id)
            .HasName("PK_Subjects");
       builder.Property(e => e.Name)
            .HasMaxLength(255)
            .IsRequired();
        builder.Property(e => e.Description)
            .HasMaxLength(65000)
            .IsRequired(false);
        builder.Property(e => e.CreatedAt)
            .IsRequired();
        builder.Property(e => e.UpdatedAt)
            .IsRequired();
        /*        builder.HasOne(e => e.Professor)
                    .WithMany(r => r.Subjects);
              *//*      .HasForeignKey(e => e.ProfessorId)
                    .HasPrincipalKey(r => r.Id)
                    .OnDelete(DeleteBehavior.NoAction);*//*

                builder.HasMany(e => e.Students)
               .WithMany(r => r.Subjects);
                *//*       .HasForeignKey<Student>(e => e.StudentId)
                       .HasPrincipalKey(r => r.Id)
                       .OnDelete(DeleteBehavior.NoAction);*/

        builder.HasOne(e => e.Professor)
               .WithMany(r => r.Subjects)
               .HasForeignKey(e => e.ProfessorId)  // Uncommented foreign key configuration
               .HasPrincipalKey(r => r.Id)
               .OnDelete(DeleteBehavior.NoAction);
/*
        builder.HasMany(e => e.Students)
            .WithMany(r => r.Subjects)
            .UsingEntity<StudentSubject>(
                j => j.HasOne(ss => ss.Student)
                      .WithMany(s => s.StudentSubjects)
                      .HasForeignKey(ss => ss.StudentId),
                j => j.HasOne(ss => ss.Subject)
                      .WithMany(s => s.StudentSubjects)
                      .HasForeignKey(ss => ss.SubjectId)
            ); */// UsingEntity to configure the many-to-many relationship table
    }
}
