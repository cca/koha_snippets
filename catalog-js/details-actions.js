// changes to the right-side #action menu of bib detail page
if (location.pathname.match('/cgi-bin/koha/opac-detail.pl')) {
    const searchParams = new URLSearchParams(location.search)
        , biblionumber = searchParams.get("biblionumber")
        , actions = $('#action')
        , itemTypes = $('#holdingst .itype img')
            .map((i, el) => $(el).attr('title'))
            .toArray()

    // Customizations to the right-side "Actions" menu
    // remove "print", "suggest for purchase", & "save record" links
    $('.print-large').parent('li').hide()
    $('#export').parent('li').hide()

    // Only add these actions if biblionumber is numeric/safe
    if (biblionumber && biblionumber.match(/^\d+$/)) {
        // Add item to list when unauthenticated
        if (!actions.find('.addtoshelf').length) {
            actions.prepend(`<li><a class="addtoshelf btn btn-link btn-lg" href="/cgi-bin/koha/opac-addbybiblionumber.pl?biblionumber=${biblionumber}"><i class="fa fa-fw fa-list" aria-hidden="true"></i> Save to your lists</a></li>`)
        }

        // Permalink
        actions.append(`<li><a class="btn btn-link btn-lg" id="permalink" href="${location.pathname + '?biblionumber=' + biblionumber}"><i class="fa fa-fw fa-link"></i> Permanent Link</a></li>`)

        // Show the Place Hold action _even for unauthenticated users_ if
        // 1) Place Hold not present
        // 2) At least one item is not a type that doesn't allow holds
        // 3) At least one item lacks a "notforloan" status
        const noHoldTypes = ['Equipment', 'Ebook', 'Object']
            , hasHoldableItem = itemTypes.some(t => !noHoldTypes.includes(t))
            , hasNonNFLItem = $('td.status .item-status')
                .map((i, el) => $(el)[0].classList)
                .toArray() // classList is a DOMTokenList with .contains(), not .includes()
                .some(classes => !classes.contains('notforloan'))
        if (!actions.find('.reserve').length && hasHoldableItem && hasNonNFLItem) {
            actions.prepend(`<li><a class="btn btn-link btn-lg reserve" href="/cgi-bin/koha/opac-reserve.pl?biblionumber=${biblionumber}"><i class="fa fa-fw fa-bookmark" aria-hidden="true"></i> Place Hold</a></li>`)
        }
    }

    // hide suggest for purchase unless every item is lost
    let statuses = $('#holdingst td.status')
    if (!statuses.toArray().every(el => !!el.querySelector('.lost'))) {
        $('.suggest_for_purchase').parent('li').hide()
    }

    // remove "Request article" link for non-periodical item types
    let type = $('.results_summary.type').text().toLowerCase()
    if (itemTypes.length && !itemTypes.some(t => t.match(/Periodical/)) || !type.match("continuing resource")) {
        $('.article_request').parent('li').remove()
    }
}
