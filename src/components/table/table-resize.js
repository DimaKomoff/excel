import {$} from '@core/dom';

export function resizeHandler($root, event) {
  const $resizer = $(event.target);
  const $parent = $resizer.closest('[data-type="resizable"]');
  const coords = $parent.getCoords();
  const type = $resizer.data.resize;
  let value;
  $resizer.addClass('active');
  document.onmousemove = e => {
    if (type === 'col') {
      const delta = e.clientX - coords.right;
      value = coords.width + delta;
      $resizer.css({
        right: -delta + 'px',
        bottom: '-2000px'
      });
    } else {
      const delta = e.clientY - coords.bottom;
      value = coords.height + delta;
      $resizer.css({
        bottom: -delta + 'px',
        right: '-9000px'
      });
    }
  };

  document.onmouseup = () => {
    if (type === 'col') {
      $root
        .findAll(`[data-col="${$parent.data.col}"]`)
        .forEach($el => $el.css({width: value + 'px'}));
    } else {
      $parent.css({
        height: value + 'px'
      });
    }
    $resizer.css({
      right: 0,
      bottom: 0
    });
    $resizer.removeClass('active');
    document.onmousemove = null;
    document.onmouseup = null;
  };
}
