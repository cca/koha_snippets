// Bug 37496: Restore parameter to limit to details of one item
if (location.pathname.match('/cgi-bin/koha/catalogue/detail.pl')) {
    // holdings table not available on page load
    setTimeout(() => {
        console.log($('#holdings_table'))
        // barcode is literally the only <td> with no unique classname :eyeroll:
        $('#holdings_table td > a[href^="/cgi-bin/koha/catalogue/moredetail.pl?biblionumber="]').each(function (idx, el) {
            console.log(el)
            // parse item id from item#### fragment at end of link
            const url = new URL(el.href)
            const item = url.hash.match(/#item(\d+)/)[1]
            if (item) {
                url.searchParams.set('item', item)
                $(this).attr('href', url.toString())
            }
        })
    }, 1000)
}
