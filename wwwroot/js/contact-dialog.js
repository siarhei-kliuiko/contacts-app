import { showPopup, closePopup } from './popup.js';
import { showErrorMessageBox } from './error-message-box.js';
import { fillContactsList } from './contacts-list.js';

$.validator.addMethod("validate-no-white-spaces", (value) => value === '' || value.trim() !== '', 'Not white spaces only.');

const showContactDialog = (action, contactId, resultCallback) => {
  $.get(action, { contactId: contactId })
    .done((dialog) => {
      showPopup(dialog);
      resultCallback(true);
    })
    .fail(() => resultCallback(false))
}

export const showAddContactDialog = (resultCallback) => {
  showContactDialog('Home/GetAddContactDialog', 0, resultCallback)
}

const getInputValue = (inputId, trim) => trim ? ($(inputId).val() + '').trim() : $(inputId).val();

const getContactFromInputs = (trim = true) => ({
  Id: getInputValue('#Id', trim),
  Name: getInputValue('#Name', trim),
  MobilePhone: getInputValue('#MobilePhone', trim),
  JobTitle: getInputValue('#JobTitle', trim),
  BirthDate: getInputValue('#BirthDate', trim),
});

$('.contacts-app__popup').on('click', '.contact-dialog__button-create', () => {
  if ($('.contact-dialog__form').valid()) {
    const token = $('input[name="__RequestVerificationToken"]').val();
    $.post('Home/AddContact', { __RequestVerificationToken: token, contactToAdd: getContactFromInputs() })
      .done((contacts) => {
        closePopup();
        fillContactsList(contacts);
      })
      .fail(() => showErrorMessageBox('Failed to add new contact'))
  }
});

let nonEditedContact;

export const showEditContactDialog = (contactId, resultCallback) => {
  showContactDialog('Home/GetEditContactDialog', contactId, (isSuccess) => {
    nonEditedContact = getContactFromInputs(false);
    resultCallback(isSuccess);
  })
}

const IsContactDataChanged = (editedContact) => JSON.stringify(editedContact) !== JSON.stringify(nonEditedContact);

$('.contacts-app__popup').on('click', '.contact-dialog__button-confirm', () => {
  if ($('.contact-dialog__form').valid()) {
    const editedContact = getContactFromInputs();
    if (IsContactDataChanged(editedContact)) {
      const token = $('input[name="__RequestVerificationToken"]').val();
      $.post('Home/EditContact', { __RequestVerificationToken: token, editedContact: editedContact })
        .done((contacts) => {
          closePopup();
          fillContactsList(contacts);
        })
        .fail(() => {
          showErrorMessageBox('Failed to edit contact');
          $.get('Home/GetContactsList', fillContactsList);
        })
    } else {
      closePopup();
      $.get('Home/GetContactsList', fillContactsList);
    }

    nonEditedContact = null;
  }
});

$('.contacts-app__popup').on('click', '.contact-dialog__button-cancel', () => closePopup());
