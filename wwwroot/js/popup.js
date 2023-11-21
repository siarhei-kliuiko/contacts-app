export const showPopup = (content) => {
  $('.contacts-app__popup').html(content);

  const body = $('body');
  const bodyWidthWithScrollbar = body.prop('clientWidth');
  body.addClass('scroll-disable');
  const verticalScrollBarWidth = body.prop('clientWidth') - bodyWidthWithScrollbar;
  if (verticalScrollBarWidth) {
    body.css('padding-right', `${verticalScrollBarWidth}px`);
  }

  
}

export const closePopup = () => {
  const body = $('body');
  body.css('padding-right', '');
  body.removeClass('scroll-disable');
  $('.contacts-app__popup').empty();
}
