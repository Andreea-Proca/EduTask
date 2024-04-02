using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MobyLabWebProgramming.Infrastructure.Migrations
{
    public partial class UpdateStudentProfessor2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_User_User_ProfessorId1",
                table: "User");

            migrationBuilder.DropForeignKey(
                name: "FK_User_User_StudentId1",
                table: "User");

            migrationBuilder.DropTable(
                name: "ProfessorStudent");

            migrationBuilder.DropIndex(
                name: "IX_User_ProfessorId1",
                table: "User");

            migrationBuilder.DropIndex(
                name: "IX_User_StudentId1",
                table: "User");

            migrationBuilder.DropColumn(
                name: "ProfessorId",
                table: "User");

            migrationBuilder.DropColumn(
                name: "ProfessorId1",
                table: "User");

            migrationBuilder.DropColumn(
                name: "StudentId",
                table: "User");

            migrationBuilder.DropColumn(
                name: "StudentId1",
                table: "User");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ProfessorId",
                table: "User",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "ProfessorId1",
                table: "User",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "StudentId",
                table: "User",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "StudentId1",
                table: "User",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ProfessorStudent",
                columns: table => new
                {
                    ProfessorsId = table.Column<Guid>(type: "uuid", nullable: false),
                    StudentsId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProfessorStudent", x => new { x.ProfessorsId, x.StudentsId });
                    table.ForeignKey(
                        name: "FK_ProfessorStudent_User_ProfessorsId",
                        column: x => x.ProfessorsId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProfessorStudent_User_StudentsId",
                        column: x => x.StudentsId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_User_ProfessorId1",
                table: "User",
                column: "ProfessorId1");

            migrationBuilder.CreateIndex(
                name: "IX_User_StudentId1",
                table: "User",
                column: "StudentId1");

            migrationBuilder.CreateIndex(
                name: "IX_ProfessorStudent_StudentsId",
                table: "ProfessorStudent",
                column: "StudentsId");

            migrationBuilder.AddForeignKey(
                name: "FK_User_User_ProfessorId1",
                table: "User",
                column: "ProfessorId1",
                principalTable: "User",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_User_User_StudentId1",
                table: "User",
                column: "StudentId1",
                principalTable: "User",
                principalColumn: "Id");
        }
    }
}
