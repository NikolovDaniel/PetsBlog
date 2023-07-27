using System;
using Microsoft.EntityFrameworkCore;
using PetBlog.Infrastructure.Data.Entities;

namespace PetBlog.Infrastructure.Data
{
    public class ApplicationDbContext : DbContext
    {

        public DbSet<Pet> Pets { get; set; }
        public DbSet<Images> Images { get; set; }
        public DbSet<Love> Loves { get; set; }
        public DbSet<Hate> Hates { get; set; }

        public ApplicationDbContext()
        {

        }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Pet>().Navigation(p => p.Hates).AutoInclude();
            modelBuilder.Entity<Pet>().Navigation(p => p.Loves).AutoInclude();
            base.OnModelCreating(modelBuilder);
        }
    }
}

