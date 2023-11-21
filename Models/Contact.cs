using System.ComponentModel;

namespace ContactsApp.Models
{
    public class Contact
    {
        public int Id { get; set; }

        public string Name { get; set; }

        [DisplayName("Mobile phone")]
        public string MobilePhone { get; set; }

        [DisplayName("Job title")]
        public string? JobTitle { get; set; }

        [DisplayName("Birth date")]
        public DateTime BirthDate { get; set; }
    }
}
