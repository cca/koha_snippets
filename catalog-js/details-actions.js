// changes to the right-side #action menu of bib detail page
if (location.pathname.match('/cgi-bin/koha/opac-detail.pl')) {
    $(()=>{
        // Customizations to the right-side "Actions" menu
        // remove "print", "suggest for purchase", & "save record" links
        $('.print-large').parent('li').hide()
        $('#export').parent('li').hide()

        // hide suggest for purchase unless every item is lost in some way
        let statuses = $('#holdingst td.status')
        if (!statuses.toArray().every(el => !!el.querySelector('.lost'))) {
            $('.suggest_for_purchase').parent('li').hide()
        }

        // remove "Request article" link for non-periodical item types
        let itypes = $('#holdingst .itype img').map((i, el) => $(el).attr('title')).toArray()
        let type = $('.results_summary.type').text().toLowerCase()
        if (itypes.length && !itypes.some(itype => itype.match(/Periodical/)) || !type.match("continuing resource")) {
            $('.article_request').parent('li').remove()
        }

        // add permalink - pull biblionumber from unapi tag
        // cast to string to prevent XSS through DOM
        let biblionumber =  String($('.unapi-id').attr('title').split(':')[2])
        let permalink = String(location.pathname + '?biblionumber=' + biblionumber)
        $('#action').append(`<li><a class="btn btn-link btn-lg" id="permalink" href="${permalink}"><i class="fa fa-fw fa-link"></i> Permanent Link</a></li>`)

        // if 1) Place Hold not present & 2) at least one item is not a type that doesn't allow holds
        // show the Place Hold action _even for unauthenticated users_ (Koha does not by default).
        const noHoldTypes = ['Equipment', 'Ebook', 'Object']
        let hasHoldableItem = itypes.some(itype => !noHoldTypes.includes(itype))
        if (!$('#action .reserve').length && hasHoldableItem) {
            $('#action').prepend(`<li><a class="btn btn-link btn-lg reserve" href="/cgi-bin/koha/opac-reserve.pl?biblionumber=${biblionumber}"><i class="fa fa-fw fa-bookmark" aria-hidden="true"></i> Place Hold</a></li>`)
        }
    })
}
