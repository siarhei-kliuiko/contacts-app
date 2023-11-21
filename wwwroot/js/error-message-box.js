import { showPopup, closePopup } from './popup.js';

export const showErrorMessageBox = (errorTitle) => {
  $.get('Home/GetErrorMessageBox', { errorTitle: errorTitle, errorMessage: 'Server error uccured' })
    .done(showPopup)
}

$('.contacts-app__popup').on('click', '.error-message-box__button-ok', () => closePopup());
