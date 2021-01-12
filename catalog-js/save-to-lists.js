// https://github.com/cca/koha_snippets/issues/12
// "save to my lists" feature for unauthenticated users
// this feature touches multiple pages & is kept in this one file for sanity
// @TODO if the Save to List button is clicked on the search results page, then
// we should return to results page rather than bib detail of the saved item
let loggedIn = !!$('.loggedinusername').length
let addToShelfAction = '.addtoshelf'

function addSaveToListBtn(target, wrapper) {
    let html = `<${wrapper}><a class="addtoshelf btn btn-lg btn-link" href="/cgi-bin/koha/opac-user.pl"><i class="fa fa-fw fa-list"></i> Save to your lists</a></${wrapper}>`

    // add link, make it store data & go to user sign in
    var biblionumber = new URLSearchParams(location.search).get('biblionumber')
    $(target).after(html)
    $(addToShelfAction).click(function(event) {
        if (!biblionumber) {
            // we're on search page, find bib number from URL in title link
            let recordLink = $(this).closest('.title_summary').find('a.title')[0].href
            biblionumber = new URLSearchParams(recordLink.split('?')[1]).get('biblionumber')
        }
        sessionStorage.cca_save_to_list = biblionumber
    })
}

if (!loggedIn) {
    if (path.match('/cgi-bin/koha/opac-detail.pl')) {
        // bib detail page & not logged in, add to right-side Actions menu
        addSaveToListBtn('#action > li:first-child', 'li')
    } else if (path.match('/cgi-bin/koha/opac-search.pl')) {
        // search results page, add to each "actions" row at bottom of result
        addSaveToListBtn('.actions-menu span.actions:last-child', 'span')
    }
} else if (sessionStorage.cca_save_to_list) {
    // we are logged in _and_ have data, where are we in the process?
    if (path.match('/cgi-bin/koha/opac-user.pl')) {
        // step 1) user page, so we just signed in, redirect to bib
        location = '/cgi-bin/koha/opac-detail.pl?biblionumber=' + sessionStorage.cca_save_to_list
    } else if (path.match('/cgi-bin/koha/opac-detail.pl')) {
        // step 2) click the "save to lists" link and then clear data
        $(addToShelfAction).click()
        sessionStorage.removeItem('cca_save_to_list')
    }
}
