// serials receive default values & form simplification
if (location.pathname.match('/cgi-bin/koha/serials/serials-edit.pl')) {
    // run on document load
    $(function(){
        // g - Cost, normal purchased price &
        // v - Cost, replacement price both default to "15.00"
        $('input[id^="tag_952_subfield_g"]').val('15.00')
        // yes, this is insane, I couldn't find a better way to isolate the subfield
        $('div[id$="v"]').filter('div[id^="subfield"]').find('input').val('15.00')
        // hide: 8 - collection code, j - shelving control no., t - copy number
        $('input[name="subfield"]')
            .filter('[value="8"], [value="j"], [value="t"]')
            .parentsUntil('li')
            .hide()
        // y - Koha item type defaults to "NEWPER" (Current Periodical)
        $('option[value="NEWPER"]').prop('selected', true)
        // highlight the barcode input
        $('label:contains("p - Barcode")').css('font-size', '120%')
            .next('input').css('box-shadow', '0px 0px 3px 3px #41ff3e')
            // remove the useless "..." link
            .next('a').hide()
    })
}
