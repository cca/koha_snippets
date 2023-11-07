// show on 1) "charges" tab, and 2) "summary" if there's a secondary "charges" tab
if (path.match('/cgi-bin/koha/opac-account.pl') || (path.match('/cgi-bin/koha/opac-user.pl') && $('#opac-user-fines').length)) {
    let html = '<p><a href="https://secure.touchnet.net/C20080_ustores/web/product_detail.jsp?PRODUCTID=210&SINGLESTORE=true" class="btn btn-warning" style="color:white;" target="_blank">Pay fines online</a></p><p>Please allow up to 24 hours for online payments to be processed in your library account.</p>'
    // only show on charges tab if the user has fine
    if (parseFloat($('.sum').eq(1).text())) {
        $('#useraccount h1').first().after(html)
    }
    $('#opac-user-fines').prepend(html)
}
