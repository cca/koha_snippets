// all our customizations to the bib details display in one place
if (location.pathname.match('/cgi-bin/koha/opac-detail.pl')) {
    $(function(){
        // all manner of links with "&" in the text are broken
        // e.g. https://library.cca.edu/cgi-bin/koha/opac-detail.pl?biblionumber=25683
        $('#catalogue_detail_biblio a[href*="&"]')
            // but 856 & public list links shouldn't be URL-encoded
            .not('.results_summary.online_resources a')
            .not('.results_summary.lists a')
            // some series links are like q=se,phr"..."&q=au:"..."
            // and we don't want to accidentally encode that middle &
            .not('.results_summary.series a')
            .each(function(){
                $(this).attr('href', function (i, href) {
                    // URI-encode ampersands
                    return href.replace(/&(amp;)?/g, '%26')
                })
        })

        // extra commas in 700 "contributor" field display
        // like MARC of 700 __ ‡a Brundige, James, ‡e director, ‡e editor.
        // => "Brundige, James [director,, editor.]"
        $('h5.author .relatorcode').replaceWith(function(){
            // jQuery expects HTML string here, not just a text node
            return '<span class="relatorcode">' + $(this).text().replace(/,,/g, ',') + '</span>'
        })

        // fix dual semicolons in publisher fields
        // like two MARC 260 fields:
        // 260 ‡aNew York, NY : ‡bNew Museum ;
        // 260 ‡aLondon : ‡bPhaidon, ‡c2016.
        // => New York, NY : New Museum ; ; London : Phaidon, 2016
        let pub = $('.results_summary.publisher')
        // if there are two consecutive semicolons separated by 2 or more spaces
        if (pub.text().match(/;\s*;/)) {
            pub.find('span[property="name"] a').each(function(){
                let el = $(this)
                let fixedText = el.text().replace(/\s*;/, '')
                el.text(fixedText)
            })
        }

        // idreambooks link should go to specific page for the title, not home pg
        let $idb = $('.idreambookssummary a')
        if ($('.idreambookssummary a').length == 2) {
            // HTML looks like:
            /*
            <span class="idreambookssummary results_summary">
                <a href="https://idreambooks.com/book-title/reviews/5">
                    <img src="positive-tiny.png">
                    79%
                </a>
                <a href="https://idreambooks.com>rating based on...</a>
            </span>
            */
            // we want to replace 2nd <a> href with 1st <a> href
            let link = $idb.eq(0).attr('href')
            $idb.eq(1).attr('href', link)
        }

        // hide "subscription from:" text, confusing, overlaps with "library has"
        $('#subscriptions p:contains("Subscription from:")').hide()

        // course reserves: separate course name & semester with a pipe
        if ($('#item_coursereserves').length) {
            // course reserves cell is always last in row
            $('tbody td:last-child').each(function (index, element){
                let cr = $(element).find('a')
                if (cr.length) {
                    // looks like: ${course name} <!-- ${section code} --> ${term}
                    // so we use ol' school DOM navigation & edit 3rd (text) node
                    let node = cr[0].childNodes[2]
                    let text = node.textContent.trim()
                    node.textContent = "| " + text
                }
            })
        }

        // Customizations to the right-side "Actions" menu
        // remove "print" & "save record" links
        $('.print-large').parent('li').hide()
        $('#export').parent('li').hide()
        // remove "Request article" link for non-periodical item types
        let itypes = Array.from($('#holdingst .itype img').map((i, el) => $(el).attr('title')))
        if (!itypes.includes('Current Periodical') && !itypes.includes('Library Use Periodical')) {
            $('.article_request').parent('li').remove()
        }

        // add 2 links to the right hand #action list
        // 1) permalink - pull biblionumber from unapi tag
        let biblionumber =  $('.unapi-id').attr('title').split(':')[2]
        let permalink = location.pathname + '?biblionumber=' + biblionumber
        $('#action').append('<li><a id="permalink" href="' + permalink + '">Permanent Link</a></li>')

        // 2) cite this page
        // can't get OCLC number from the page so we use ISBN
        let isbn = $('.isbn:last').text().split(' ')[1];
        if (isbn) {
            isbn = isbn.replace(/\W*$/, '').replace(/-/, '')
            // construct Worldcat URL we'll embed
            let citeThisUrl = 'https://www.worldcat.org/isbn/' + isbn + '?page=citation'

            // add the "cite this" link to the actions menu
            $('#action').append('<li><a data-toggle="modal" data-target="#citeModal" id="citethis">Cite this work</a></li>')
            // icon
            $('#citethis').css({
                'background': 'transparent url(/opac-tmpl/bootstrap/images/sprite.png) no-repeat 5px -921px',
                'padding-left': '35px'
            })

// add "cite this" modal wrapping Worldcat iframe to the DOM
// NOTE: do _not_ wrap iframe in div.modal-body as it causes double scrollbars
            $('body').prepend(
`<div id="citeModal" aria-modal="true" aria-labelledby="citethis_label" class="modal hide" role="dialog">
	<div class="modal-header">
		<button type="button" class="closebtn" data-dismiss="modal" aria-hidden="true">×</button>
        <h3 id="citethis_label">Cite this work</h3>
	</div>
	<iframe height="400" frameborder="0" src="${citeThisUrl}" style="width:100%;"></iframe>
	<div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
	</div>
</div>`)
        }
    }) // close $(fn(){})
}
