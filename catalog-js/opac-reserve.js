// place a hold page
if (location.pathname.match('/cgi-bin/koha/opac-reserve.pl')) {
    // warning when user is about to place a hold on a LUO item
    let itype = $('.itype').text().trim()
    // this test catches a number of item types
    if (itype.match('Library Use')) {
        $('.holdrow').append('<div class="alert"><b>Note that this item is for in-library use only.</b></div>')
    }

    // some people put the "hold not needed date" immediately after the
    // "hold starts on" date — we recommend at least a week buffer here
    $('.holddatefrom, .holddateto').blur(()=>{
        let d1 = new Date($('.holddatefrom').val()).getTime()
        let d2 = new Date($('.holddateto').val()).getTime()
        // difference in days
        let diff = parseInt((d2 - d1) / (24 * 3600 * 1000))
        let html = '<li class="js-holddatewarning text-error">We recommend at least seven days in between the hold start date and "not needed by" date.</li>'

        // show a warning if there isn't one already
        if (diff < 7 && !$('.js-holddatewarning').length) {
            $('.holddateto').parent().append(html)
        } else if (diff >= 7) {
            $('.js-holddatewarning').remove()
        }
    })
}
