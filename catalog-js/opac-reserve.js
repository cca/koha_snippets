// place a hold page
if (path.match('/cgi-bin/koha/opac-reserve.pl')) {
    // warning when user is about to place a hold on a LUO item
    let itype = $('.itype').text().trim()
    // this test catches a number of item types
    if (itype.match('Library Use')) {
        $('.holdrow').append('<div class="alert"><b>Note that this item is for in-library use only.</b></div>')
    }

    // hide "hold not needed after" datepicker
    // it generates more confusion than it adds utility
    $('.holddateto').parent().hide()
}
