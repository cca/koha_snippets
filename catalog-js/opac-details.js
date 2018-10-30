// all our customizations to the bib details display in one place
if (location.pathname.match('/cgi-bin/koha/opac-detail.pl')) {
    // run on page load in own scope
    $(function(){

        // if there are two cover images present, hide the second one
        // lets us "fix" blurry/bad cover images by uploading our own
        // we have to overwrite KOHA.LocalCover to accomplish this since
        // images load dynamically & CSS has no "nth-descendent" type selector
        if (typeof KOHA == "undefined" || !KOHA) window.KOHA = {}
        // this function copied from /opac-tmpl/bootstrap/js/localcovers.js
        KOHA.LocalCover.GetCoverFromBibnumber = function(uselink) {
            $("div[id^=local-thumbnail],span[id^=local-thumbnail]").each(function(i) {
                var mydiv = this;
                var message = document.createElement("span");
                $(message).attr("class","no-image");
                $(message).html(NO_LOCAL_JACKET);
                $(mydiv).parent().find('.no-image').remove();
                $(mydiv).append(message);
                var img = $("<img />").attr('src',
                    '/cgi-bin/koha/opac-image.pl?thumbnail=1&biblionumber=' + $(mydiv).attr("class"))
                    .load(function () {
                        this.setAttribute("class", "thumbnail");
                        if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth === 0) {
                            //IE HACK
                            try {
                                $(mydiv).append(img);
                                $(mydiv).children('.no-image').remove();
                            }
                            catch (err) {
                            }
                        } else if (this.width > 1) { // don't show the silly 1px "no image" img
                            if (uselink) {
                                var a = $("<a />").attr('href', '/cgi-bin/koha/opac-imageviewer.pl?biblionumber=' + $(mydiv).attr("class"));
                                $(a).append(img);
                                $(mydiv).empty().append(a);
                            } else {
                                $(mydiv).empty().append(img);
                            }
                            $(mydiv).children('.no-image').remove();
                            // remove the COCE cover image div
                            $('#coce-thumbnail-preview').remove()
                        }
                    })
            });
        }
        // execute function we just redefined
        KOHA.LocalCover.GetCoverFromBibnumber(true)

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
                el.attr('href', `/cgi-bin/koha/opac-search.pl?q=se,phr:%22${query}%22`)
            }
        })

        // all manner of links with "&" in the text are broken
        // e.g. https://library.cca.edu/cgi-bin/koha/opac-detail.pl?biblionumber=25683
        $('#catalogue_detail_biblio a[href*="&"]')
            // but 856 & public list links shouldn't be URL-encoded
            .not('.results_summary.online_resources a')
            .not('.results_summary.lists a')
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
        $('.print-large').parent('li').remove()
        $('#export').parent('li').remove()
        // remove "Request article" link for non-periodical item types
        let itypes = Array.from($('.holdingst .itype img').map((i, el) => $(el).attr('title')))
        if (!itypes.includes('Current Periodical') && !itypes.includes('Library Use Periodical')) {
            $('.article_request').parent('li').remove()
        }

        // add 2 links to the right hand #action list
        // 1) permalink - pull biblionumber from unapi tag
        let biblionumber =  $('.unapi-id').attr('title').split(':')[2]
        let permalink = location.pathname + '?biblionumber=' + biblionumber
        $('#action').append('<li><a id="permalink" href="' + permalink + '">Permanent Link</a></li>')
        // icon
        $('#permalink').css({
            'background': 'transparent url(/opac-tmpl/lib/famfamfam/silk/link.png) no-repeat 11px',
            'padding-left': '35px'
        })

        // 2) cite this page
        // can't get OCLC number from the page so we use ISBN
        let isbn = $('.isbn:last').text().split(' ')[1];
        if (isbn) {
            isbn = isbn.replace(/\W*$/, '').replace(/-/, '')
            // construct Worldcat URL we'll embed
            let citeThisUrl = 'https://www.worldcat.org/isbn/' + isbn + '?page=citation'

            // add the "cite this" link to the actions menu
            $('#action').append('<li><a id="citethis" href="' + citeThisUrl + '">Cite this work</a></li>')
            // icon
            $('#citethis').css({
                'background': 'transparent url(/opac-tmpl/bootstrap/images/sprite.png) no-repeat 5px -921px',
                'padding-left': '35px'
            })

// add "cite this" modal wrapping Worldcat iframe to the DOM
// NOTE: do _not_ wrap iframe in div.modal-body as it causes double scrollbars
            $('body').prepend(
`<div id="citeModal" class="modal hide" role="dialog">
	<div class="modal-header">
		<button type="button" class="closebtn" data-dismiss="modal" aria-hidden="true">×</button>
        <h3>Cite this work</h3>
	</div>
	<iframe height="400" frameborder="0" src="${citeThisUrl}" style="width:100%;"></iframe>
	<div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
	</div>
</div>`)

            // setup Bootstrap modal
            $('#citethis').click(function(event){
                event.preventDefault()
                $('#citeModal').modal('show')
            })
        }
    })
}
