// user's "summary" page immediately after logging in
if (path.match('/cgi-bin/koha/opac-account.pl')) {
    // only show if the user has fine
    if (parseFloat($('.sum').eq(1).text())) {
        let html = '<p><a href="https://secure.touchnet.net/C20080_ustores/web/product_detail.jsp?PRODUCTID=210&SINGLESTORE=true" class="btn btn-warning" style="color:white;" target="_blank">Pay fines online</p>'
        $('#useraccount h3').first().after(html)
    }
}
