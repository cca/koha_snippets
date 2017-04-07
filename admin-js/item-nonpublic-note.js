// non-public note doesn't appear on the "items" editing tab
// warn people about this & recommend they edit elsewhere
if (location.href.match('cgi-bin/koha/catalogue/moredetail.pl')) {
    $(function(){
        // select nonpublic notes
        var npns = $('textarea[name="itemnotes_nonpublic"]')
        // only disable the input if there's no data in it
        if (npns.val() === '') {
            npns.prop('disabled', true)
            npns.css('box-shadow', '1px 1px 1px 1px yellow')
            // emoji use ftw
            npns.attr('title', 'Note: editing non-public notes here doesn\'t work. Use the "Edit Items" link under the "✏️ Edit" button to change it.')
            npns.next('input.submit').prop('disabled', true)
        }
    })
}
