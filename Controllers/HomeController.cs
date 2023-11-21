using ContactsApp.Models;
using Microsoft.AspNetCore.Mvc;

namespace ContactsApp.Controllers
{
    public class HomeController : Controller
    {
        private readonly ContactsStorage contactsStorage;
        public HomeController(ContactsStorage storage)
        {
            this.contactsStorage = storage;
        }

        [HttpGet]
        public IActionResult Index()
        {
            return View(this.contactsStorage.Contacts);
        }

        [HttpGet]
        public IActionResult GetContactsList()
        {
            return PartialView("_ContactsListRecords", this.contactsStorage.Contacts);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult DeleteContact(int contactId)
        {
            var contactToRemove = this.contactsStorage.Contacts.SingleOrDefault(Contact => Contact.Id == contactId);
            if (contactToRemove != null)
            {
                this.contactsStorage.Contacts.Remove(contactToRemove);
                this.contactsStorage.SaveChanges();
            }

            return this.GetContactsList();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult AddContact([Bind("Name, MobilePhone, JobTitle, BirthDate")]Contact contactToAdd)
        {
            this.contactsStorage.Contacts.Add(contactToAdd);
            this.contactsStorage.SaveChanges();
            return this.GetContactsList();
        }

        [HttpGet]
        public IActionResult GetAddContactDialog()
        {
            this.ViewBag.PopupTitle = "Add new contact";
            return PartialView("PopupDialog/_ContactDialog");
        }

        [HttpGet]
        public IActionResult GetEditContactDialog(int contactId)
        {
            var contactToEdit = this.contactsStorage.Contacts.SingleOrDefault(Contact => Contact.Id == contactId);
            if (contactToEdit != null)
            {
                this.ViewBag.PopupTitle = "Edit contact";
                return PartialView("PopupDialog/_ContactDialog", contactToEdit);
            }
            else
            {
                return StatusCode(StatusCodes.Status410Gone);
            }

            
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult EditContact([Bind("Id, Name, MobilePhone, JobTitle, BirthDate")] Contact editedContact)
        {
            var contactToEdit = this.contactsStorage.Contacts.SingleOrDefault(Contact => Contact.Id == editedContact.Id);
            if (contactToEdit != null)
            {
                contactToEdit.JobTitle = editedContact.JobTitle;
                contactToEdit.BirthDate = editedContact.BirthDate;
                contactToEdit.MobilePhone = editedContact.MobilePhone;
                contactToEdit.Name = editedContact.Name;
                this.contactsStorage.SaveChanges();
                return this.GetContactsList();
            }
            else
            {
                return StatusCode(StatusCodes.Status410Gone);
            }
        }

        [HttpGet]
        public IActionResult GetErrorMessageBox(string errorTitle, string errorMessage)
        {
            this.ViewBag.MessageTitle = errorTitle;
            this.ViewBag.MessageText = errorMessage;
            return PartialView("PopupDialog/_ErrorMessageBox");
        }
    }
}
