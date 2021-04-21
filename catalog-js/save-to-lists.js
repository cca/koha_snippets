// https://github.com/cca/koha_snippets/issues/12
// "save to my lists" feature for unauthenticated users
// this feature touches multiple pages & is kept in this one file for sanity
let loggedIn = !!$('.loggedinusername').length
 , addToShelfAction = '.addtoshelf'

function addSaveToListBtn(target, wrapper, large=false) {
    // add btn-lg class, for bib details actions menu
    let html = `<${wrapper}><a class="addtoshelf btn btn-link ${large ? 'btn-lg' : ''}" href="/cgi-bin/koha/opac-user.pl"><i class="fa fa-fw fa-list"></i> Save to your lists</a></${wrapper}>`

    // add link, make it store data & go to user sign in
    $(target).after(html)
    $(addToShelfAction).click(function(event) {
        let bib = new URLSearchParams(location.search).get('biblionumber')
        if (!bib) {
            // we're on search page, find bib number from ID of title element
            bib = $(this).closest('.title_summary').attr('id').split('title_summary_')[1]
            sessionStorage.setItem('cca_search_url', location.toString())
        }
        sessionStorage.cca_save_to_list = bib
    })
}

if (!loggedIn) {
    if (path.match('/cgi-bin/koha/opac-detail.pl')) {
        // bib detail page & not logged in, add to right-side Actions menu
        addSaveToListBtn('#action > li:first-child', 'li', true)
    } else if (path.match('/cgi-bin/koha/opac-search.pl')) {
        // search results page, add to each "actions" row at bottom of result
        addSaveToListBtn('.actions-menu span.actions:nth-last-child(2)', 'span class="actions"')
    }
} else if (sessionStorage.cca_save_to_list) {
    let bib = sessionStorage.cca_save_to_list
    // we are logged in _and_ have data but were we on a search or details page?
    if (sessionStorage.cca_search_url) {
        // we started on a search page
        if (path.match('/cgi-bin/koha/opac-user.pl')) {
            // step 1) user page, so we just signed in, redirect to saved search
            location = sessionStorage.cca_search_url
        } else if (path.match('/cgi-bin/koha/opac-search.pl')) {
            // step 2) find bib, click "save to lists" action then clear data
            $('#title_summary_' + bib).find('.actions [href^="/cgi-bin/koha/opac-addbybiblionumber.pl"]').click()
            sessionStorage.removeItem('cca_save_to_list')
            sessionStorage.removeItem('cca_search_url')
        }
    } else {
        // we start on a details page, simpler process
        if (path.match('/cgi-bin/koha/opac-user.pl')) {
            // step 1) user page, so we just signed in, redirect to bib
            location = '/cgi-bin/koha/opac-detail.pl?biblionumber=' + bib
        } else if (path.match('/cgi-bin/koha/opac-detail.pl')) {
            // step 2) click the "save to lists" link then clear data
            $(addToShelfAction).click()
            sessionStorage.removeItem('cca_save_to_list')
        }
    }
}
