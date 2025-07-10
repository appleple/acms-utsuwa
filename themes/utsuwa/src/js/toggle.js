import domContentLoaded from 'dom-content-loaded';

export default () => {
  domContentLoaded(() => {
    $('.js-toggle').on('click', () => {
      const $self = $(this);
      const $parent = $self.closest('js-toggle');
      const $body = $parent.find('.js-toggle-body');
      $self.toggleClass('is-active');
      $body.slideToggle();
    });
  });
};
