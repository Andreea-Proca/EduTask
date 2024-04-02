using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MobyLabWebProgramming.Infrastructure.Migrations
{
    public partial class UpdateStudentSubject : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StudentSubject_Subject_SubjectsId",
                table: "StudentSubject");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentSubject_User_StudentsId",
                table: "StudentSubject");

            migrationBuilder.DropForeignKey(
                name: "FK_Subject_User_Id",
                table: "Subject");

            migrationBuilder.DropColumn(
                name: "StudentId",
                table: "Subject");

            migrationBuilder.RenameColumn(
                name: "SubjectsId",
                table: "StudentSubject",
                newName: "SubjectId");

            migrationBuilder.RenameColumn(
                name: "StudentsId",
                table: "StudentSubject",
                newName: "StudentId");

            migrationBuilder.RenameIndex(
                name: "IX_StudentSubject_SubjectsId",
                table: "StudentSubject",
                newName: "IX_StudentSubject_SubjectId");

            migrationBuilder.CreateIndex(
                name: "IX_Subject_ProfessorId",
                table: "Subject",
                column: "ProfessorId");

            migrationBuilder.AddForeignKey(
                name: "FK_StudentSubject_Subject_SubjectId",
                table: "StudentSubject",
                column: "SubjectId",
                principalTable: "Subject",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentSubject_User_StudentId",
                table: "StudentSubject",
                column: "StudentId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Subject_User_ProfessorId",
                table: "Subject",
                column: "ProfessorId",
                principalTable: "User",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StudentSubject_Subject_SubjectId",
                table: "StudentSubject");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentSubject_User_StudentId",
                table: "StudentSubject");

            migrationBuilder.DropForeignKey(
                name: "FK_Subject_User_ProfessorId",
                table: "Subject");

            migrationBuilder.DropIndex(
                name: "IX_Subject_ProfessorId",
                table: "Subject");

            migrationBuilder.RenameColumn(
                name: "SubjectId",
                table: "StudentSubject",
                newName: "SubjectsId");

            migrationBuilder.RenameColumn(
                name: "StudentId",
                table: "StudentSubject",
                newName: "StudentsId");

            migrationBuilder.RenameIndex(
                name: "IX_StudentSubject_SubjectId",
                table: "StudentSubject",
                newName: "IX_StudentSubject_SubjectsId");

            migrationBuilder.AddColumn<Guid>(
                name: "StudentId",
                table: "Subject",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddForeignKey(
                name: "FK_StudentSubject_Subject_SubjectsId",
                table: "StudentSubject",
                column: "SubjectsId",
                principalTable: "Subject",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentSubject_User_StudentsId",
                table: "StudentSubject",
                column: "StudentsId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Subject_User_Id",
                table: "Subject",
                column: "Id",
                principalTable: "User",
                principalColumn: "Id");
        }
    }
}
