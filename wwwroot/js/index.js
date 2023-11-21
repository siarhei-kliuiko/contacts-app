import { showAddContactDialog, showEditContactDialog } from './contact-dialog.js';
import { showErrorMessageBox } from './error-message-box.js';
import { fillContactsList } from './contacts-list.js';

$('.contacts-app__button-add').on('click', () =>
  showAddContactDialog((isSuccess) => {
    if (!isSuccess) {
      showErrorMessageBox('Failed to add new contact');
    }
  })
);

$('.contacts-list__records').on('click', '.contact-info__button-edit', function () {
  const contactId = $(this).siblings('input').first().val();
  showEditContactDialog(contactId, (isSuccess) => {
    if (!isSuccess) {
      showErrorMessageBox('Failed to edit contact');
      $.get('Home/GetContactsList', fillContactsList);
    }
  });
});

$('.contacts-list__records').on('click', '.contact-info__button-delete', function () {
  const token = $('input[name="__RequestVerificationToken"]').val();
  $.post('Home/DeleteContact', { __RequestVerificationToken: token, contactId: $(this).siblings('input').first().val() })
    .done(fillContactsList)
});
