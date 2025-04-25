$(document).ready(function () {
  $('#tourclick').on('click', function (e) {
    e.preventDefault();

    $('#tour-banner').css('display', 'block');

    $('#tour-banner').html(`
          <iframe 
            src="https://www.youtube.com/embed/6RcQ9qx0n0s?si=35XRNG-jeKSDb8yY"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
            style="position:absolute;top:0;left:0;width:100%;height:100%;">
          </iframe>
      `);
  });
});