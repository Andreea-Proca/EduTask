using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using MobyLabWebProgramming.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MobyLabWebProgramming.Infrastructure.EntityConfigurations;

public class StudentSubjectConfiguration : IEntityTypeConfiguration<Subject>
{
    public void Configure(EntityTypeBuilder<Subject> builder)
    {
        builder.HasMany(e => e.Students)
           .WithMany(r => r.Subjects)
           .UsingEntity<StudentSubject>(
               j => j.HasOne(ss => ss.Student)
                     .WithMany(s => s.StudentSubjects)
                     .HasForeignKey(ss => ss.StudentId),
               j => j.HasOne(ss => ss.Subject)
                     .WithMany(s => s.StudentSubjects)
                     .HasForeignKey(ss => ss.SubjectId)
           );
    }
}
