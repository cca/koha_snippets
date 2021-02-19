// changes to the right-side #action menu of bib detail page
if (path.match('/cgi-bin/koha/opac-detail.pl')) {
    $(()=>{
        // Customizations to the right-side "Actions" menu
        // remove "print", "suggest for purchase", & "save record" links
        $('.print-large').parent('li').hide()
        $('.suggest_for_purchase').parent('li').hide()
        $('#export').parent('li').hide()

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

        // 2) cite this page
        // can't get OCLC number from the page so we use ISBN
        let isbn = $('.isbn:last').text().split(' ')[1];
        if (isbn) {
            isbn = isbn.replace(/\W*$/, '').replace(/-/, '')
            // construct Worldcat URL we'll embed
            let citeThisUrl = 'https://www.worldcat.org/isbn/' + isbn + '?page=citation'

            // add the "cite this" link to the actions menu
            $('#action').append('<li><a class="btn btn-link btn-lg" href="#" data-toggle="modal" data-target="#citeModal" id="citethis"><i class="fa fa-fw fa-code"></i> Cite this work</a></li>')

            // add "cite this" modal wrapping Worldcat iframe to the DOM
            // NOTE: do _not_ wrap iframe in div.modal-body as it causes double scrollbars
            let citeThisModal = `<div id="citeModal" aria-modal="true" aria-labelledby="citethis_label" class="modal hide" role="dialog">
            <div class="modal-header">
                <button type="button" class="closebtn" data-dismiss="modal" aria-hidden="true">×</button>
                <h3 id="citethis_label">Cite this work</h3>
            </div>
            <iframe height="400" frameborder="0" src="${citeThisUrl}" style="width:100%;"></iframe>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
            </div>`
            $('body').prepend(citeThisModal)
        }
    })
}
