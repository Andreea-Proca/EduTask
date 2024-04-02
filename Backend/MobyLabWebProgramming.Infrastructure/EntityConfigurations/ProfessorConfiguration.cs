using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MobyLabWebProgramming.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MobyLabWebProgramming.Infrastructure.EntityConfigurations;

public class ProfessorConfiguration :  IEntityTypeConfiguration<Professor>
{
    public void Configure(EntityTypeBuilder<Professor> builder)
    {
       //builder.HasKey(p => p.Id)
         //   .HasName("PK_Professors");
        builder.HasMany(p => p.Subjects)
            .WithOne(s => s.Professor)
            .HasForeignKey(s => s.Id)
            .HasPrincipalKey(p => p.Id)
            //.IsRequired()
            .OnDelete(DeleteBehavior.NoAction);

 /*       builder.HasMany(e => e.Students)
     .WithMany(r => r.Professors);*/
   /*     builder.HasOne(builder => builder.User)
            .WithOne()
            .HasForeignKey<Professor>(p => p.Id)
            .HasPrincipalKey<User>(u => u.Id)
            .OnDelete(DeleteBehavior.NoAction); */
    }
}
