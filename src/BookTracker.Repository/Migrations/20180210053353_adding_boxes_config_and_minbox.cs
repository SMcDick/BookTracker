using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace BookTracker.Repository.Migrations
{
    public partial class adding_boxes_config_and_minbox : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BoxConfig",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Color = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    Enabled = table.Column<bool>(nullable: false),
                    MaxSalesRank = table.Column<int>(nullable: false),
                    MaxSalesRank1 = table.Column<int>(nullable: false),
                    MaxSalesRank2 = table.Column<int>(nullable: false),
                    MaxSalesRank3 = table.Column<int>(nullable: false),
                    MinNetPayout = table.Column<decimal>(nullable: false),
                    MinNetPayout1 = table.Column<decimal>(nullable: false),
                    MinNetPayout2 = table.Column<decimal>(nullable: false),
                    MinNetPayout3 = table.Column<decimal>(nullable: false),
                    MinSalesRank = table.Column<int>(nullable: false),
                    MinSalesRank1 = table.Column<int>(nullable: false),
                    MinSalesRank2 = table.Column<int>(nullable: false),
                    MinSalesRank3 = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    SoundPath = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BoxConfig", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MinBoxConfig",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Color = table.Column<string>(nullable: true),
                    Enabled = table.Column<bool>(nullable: false),
                    OfferGreaterThan = table.Column<decimal>(nullable: false),
                    Sound = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MinBoxConfig", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BoxConfig");

            migrationBuilder.DropTable(
                name: "MinBoxConfig");
        }
    }
}
