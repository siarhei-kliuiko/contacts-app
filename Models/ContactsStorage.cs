using Microsoft.EntityFrameworkCore;

namespace ContactsApp.Models
{
    public class ContactsStorage : DbContext
    {
        public DbSet<Contact> Contacts { get; set; }

        public ContactsStorage(DbContextOptions options) : base(options)
        {
            Database.EnsureCreated();
        }
    }
}
