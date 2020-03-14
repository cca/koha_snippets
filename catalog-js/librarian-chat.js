// libraryh3lp chat pop-up window, see https://libraryh3lp.com/dashboard/services
if (path.match('/cgi-bin/koha/opac-search.pl') || path.match('/cgi-bin/koha/opac-user.pl')) {
    $('body').append('<div class="needs-js">')
    // three second delay
    setTimeout(() => {
      var x = document.createElement("script"); x.type = "text/javascript"; x.async = true;
      x.src = (document.location.protocol === "https:" ? "https://" : "http://") + "libraryh3lp.com/js/libraryh3lp.js?13843";
      var y = document.getElementsByTagName("script")[0]; y.parentNode.insertBefore(x, y);
    }, 3000)
}
