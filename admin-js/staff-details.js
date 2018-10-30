// changes to staff-side bibliographic record view
if (location.pathname.match('/cgi-bin/koha/catalogue/detail.pl')) {
    // wait for document load
    $(() => {

        // fix two issues related to 830 series links
        $('.results_summary.series a').each(function(){
            let el = $(this)
            // fix 830$a series links ending in semicolons, see bug #14716
            let href = el.attr('href').replace(/;/g, '%3B')
            el.attr('href', href)
            // fix 490$a linked to 830 links, bug #21589
            // move query from author index to series
            if (href.match(/q=se,phr:%22%22&q=au:%22/)) {
                let query = href.match(/q=au:%22(.*)%22/)[1]
                el.attr('href', `/cgi-bin/koha/catalogue/search.pl?q=se,phr:%22${query}%22`)
            }
        })

    })
}
