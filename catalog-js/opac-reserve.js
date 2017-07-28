// warning when user is about to place a hold on a LUO item
if (location.pathname.match('/cgi-bin/koha/opac-reserve.pl')) {
    var itype = $('.itype').text().trim()
    // this test catches a number of item types
    if (itype.match('Library Use')) {
        $('.holdrow').append('<div class="alert"><b>Note that this item is for in-library use only.</b></div>')
    }
}
