// changes to the right-side #action menu of bib detail page
if (path.match('/cgi-bin/koha/opac-detail.pl')) {
    $(()=>{
        // Customizations to the right-side "Actions" menu
        // remove "print", "suggest for purchase", & "save record" links
        $('.print-large').parent('li').hide()
        $('#export').parent('li').hide()
        // hide suggest for purchase unless every item is lost in some way
        let statuses = $('#holdingst td.status')
        if (statuses.length && !statuses.toArray().every(el => !!el.querySelector('.lost'))) {
            $('.suggest_for_purchase').parent('li').hide()
        }

        // remove "Request article" link for non-periodical item types
        let itypes = Array.from($('#holdingst .itype img').map((i, el) => $(el).attr('title')))
        if (!itypes.includes('Current Periodical') && !itypes.includes('Library Use Periodical')) {
            $('.article_request').parent('li').remove()
        }

        // add 2 links to the right hand #action list
        // 1) permalink - pull biblionumber from unapi tag
        let biblionumber =  $('.unapi-id').attr('title').split(':')[2]
        let permalink = path + '?biblionumber=' + biblionumber
        $('#action').append('<li><a class="btn btn-link btn-lg" id="permalink" href="' + permalink + '"><i class="fa fa-fw fa-link"></i> Permanent Link</a></li>')
    })
}
