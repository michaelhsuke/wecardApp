/**
 * Created by xuke on 12/24/15.
 */
$(function () {
  $(document).on('touchstart', '.setting-item', function () {
    $(this).addClass('activated')
  })

  $(document).on('touchend', '.setting-item', function () {
    $(this).removeClass('activated')
  })
});
