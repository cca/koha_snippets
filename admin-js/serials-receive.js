// serials receive default values & form simplification
if (location.pathname.match('/cgi-bin/koha/serials/serials-edit.pl')) {
    // run on document load
    $(function(){
        var fixForm = function() {
            var item = $(this).next('fieldset')
            // c - Shelving location defaults to "CURRPER" (Current Periodical)
            item.find('option[value="CURRPER"]').prop('selected', true)
            // g - Cost, normal purchased price &
            // v - Cost, replacement price both default to "15.00"
            item.find('input[id^="tag_952_subfield_g"]').val('15.00')
            // yes, this is insane, I couldn't find a better way to isolate the subfield
            item.find('div[id$="v"]').filter('div[id^="subfield"]').find('input').val('15.00')
            // hide: 8 - collection code, j - shelving control no., t - copy number
            item.find('input[name="subfield"]')
                .filter('[value="8"], [value="j"], [value="t"]')
                .parentsUntil('li')
                .hide()
            // y - Koha item type defaults to "NEWPER" (Current Periodical)
            item.find('option[value="NEWPER"]').prop('selected', true)
            // highlight the barcode input
            item.find('label:contains("p - Barcode")').css('font-size', '120%')
                .next('input').css('box-shadow', '0px 0px 3px 3px #41ff3e')
                // remove the useless "..." link
                .next('a').hide()
        }

        // when a new issue is about to be received, fill in values
        $('a:contains("Click to add item")').on('click', fixForm)
        // staff tend to use "Status" <select> menu, not "add item" link
        $('select[name="status"]').on('change', function() {
            var context = $(this).closest('tr').next().find('a')[0]
            fixForm.apply(context)
        })
    })
}
