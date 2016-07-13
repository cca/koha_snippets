// all our customizations to the bib details display in one place
if (location.pathname.match('/cgi-bin/koha/opac-detail.pl')) {
    // run on page load in own scope
    $(function(){

        // idreambooks link should go to specific page for the title, not home pg
        var $idb = $('.idreambookssummary a')
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
            var link = $idb.eq(0).attr('href')
            $idb.eq(1).attr('href', link)
        }

        // remove "print" & "save record" links from right hand #action list
        $('.print-large').parent('li').remove()
        $('#export').parent('li').remove()

        // add 2 links to the right hand #action list
        // 1) permalink - can get biblionumber from object in pagination array
        // or pull from unapi tag if that's not present (e.g. no prior search)
        var biblionumber =  (window.arrPagination && arrPagination[1].biblionumber) || $('.unapi-id').attr('title').split(':')[2]
        var permalink = location.pathname + '?biblionumber=' + biblionumber
        $('#action').append('<li><a id="permalink" href="' + permalink + '">Permanent Link</a></li>')
        // icon
        $('#permalink').css({
            'background': 'transparent url(/opac-tmpl/lib/famfamfam/silk/link.png) no-repeat 11px',
            'padding-left': '35px'
        })

        // 2) cite this page
        // can't get OCLC number from the page so we use ISBN
        var isbn = $('.isbn:last').text().split(' ')[1];
        if (isbn) {
            isbn = isbn.replace(/\W*$/, '').replace(/-/, '')
            // construct Worldcat URL we'll embed
            var citeThisUrl = 'https://www.worldcat.org/isbn/' + isbn + '?page=citation'

            // add the "cite this" link to the actions menu
            $('#action').append('<li><a id="citethis" href="' + citeThisUrl + '">Cite this work</a></li>')
            // icon
            $('#citethis').css({
                'background': 'transparent url(/opac-tmpl/bootstrap/images/sprite.png) no-repeat 5px -921px',
                'padding-left': '35px'
            })

// add "cite this" modal wrapping Worldcat iframe to the DOM
// ew gross, gotta be a better way (template literals & screw older browsers?)
// NOTE: do _not_ wrap iframe in div.modal-body as it causes double scrollbars
            $('body').prepend(
'<div id="citeModal" class="modal hide" role="dialog">\
	<div class="modal-header">\
		<button type="button" class="closebtn" data-dismiss="modal" aria-hidden="true">×</button>\
        <h3>Cite this work</h3>\
	</div>\
	<iframe height="400" frameborder="0" src="' + citeThisUrl + '" style="width:100%;"></iframe>\
	<div class="modal-footer">\
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\
	</div>\
</div>'
            )

            // setup Bootstrap modal
            $('#citethis').click(function(event){
                event.preventDefault()
                $('#citeModal').modal('show')
            })
        }
    })
}
