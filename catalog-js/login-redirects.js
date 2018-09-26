// actions that require a login don't redirect back to the action post-CAS
// this script uses session storage to remember what's going on & redirect
// users back to the appropriate place for these actions:
// 1) back to opac-reserve.pl?biblionumber=N when placing hold
// 2) back to opac-suggestions.pl?op=add when making purchase suggestion
// 3) back to opac-request-article.pl?biblionumber(s)=N when requesting an article
// 4) back to opac-restrictedpage.pl (which doesn't require any parameter passing)

// this is a little weird: we assume we're on the login screen if we see the
// <!-- TEMPLATE FILE: opac-auth.tt --> comment which is a child only of the
// document (not even <html> element)
var onLoginScreen = !!document.childNodes[1].textContent.match('opac-auth.tt')
    , path = location.pathname
    , search = location.search
    , storage = window.sessionStorage
    , bibs
    , bib

// 1) record bib number when we're trying to place a hold but not logged in
if (onLoginScreen && path.match('/cgi-bin/koha/opac-reserve.pl')) {
    // we always clear storage first in case multiple actions build up
    // e.g. first they place hold, sign out, request article in same session
    storage.clear()
    bib = search.match(/biblionumber=(\d+)/) && search.match(/biblionumber=(\d+)/)[1]
    // URL structure is slightly different for multiple holds, biblionumbers
    // are listed in one parameter and forward-slash separated
    bibs = search.match(/biblionumbers=([\d/]+)/) && search.match(/biblionumbers=([\d/]+)/)[1]
    if (bib) storage.setItem('cca_bib_hold', bib)
    if (bibs) storage.setItem('cca_bib_holds', bibs)
}
else if (path.match('/cgi-bin/koha/opac-user.pl') && (storage.cca_bib_hold || storage.cca_bib_holds)) {
    bib = storage.cca_bib_hold
    bibs = storage.cca_bib_holds
    // clear storage, go to appropriate reserve page
    storage.removeItem('cca_bib_hold')
    storage.removeItem('cca_bib_holds')
    if (bib) location = '/cgi-bin/koha/opac-reserve.pl?biblionumber=' + bib
    if (bibs) location = '/cgi-bin/koha/opac-reserve.pl?biblionumbers=' + bibs
}

// 2) we're trying to make a purchase suggestion but we're not logged in
// note we need to use location.href because we want to match query string too
if (onLoginScreen && location.href.match(/\/cgi-bin\/koha\/opac-suggestions.pl\?op=add/)) {
    storage.clear()
    storage.setItem('cca_suggestion', true)
}
else if (path.match('/cgi-bin/koha/opac-user.pl') && storage.cca_suggestion) {
    // clear storage, go to purchase suggestions form
    storage.removeItem('cca_suggestion')
    location = '/cgi-bin/koha/opac-suggestions.pl?op=add'
}

// 3) we're trying to make an article request but we're not logged in
if (onLoginScreen && path.match('/cgi-bin/koha/opac-request-article.pl')) {
    storage.clear()
    bib = search.match(/biblionumber=(\d+)/)[1]
    storage.setItem('cca_article_request', bib)
}
else if (path.match('/cgi-bin/koha/opac-user.pl') && storage.cca_article_request) {
    bib = storage.cca_article_request
    // clear storage, go to appropriate article requests page
    storage.removeItem('cca_article_request')
    location = '/cgi-bin/koha/opac-request-article.pl?biblionumber=' + bib
}

// 4) we're trying to access the resticted page
if (onLoginScreen && path.match('/cgi-bin/koha/opac-restrictedpage.pl')) {
    storage.clear()
    storage.setItem('cca_restricted_page', true)
}
else if (path.match('/cgi-bin/koha/opac-user.pl') && storage.cca_restricted_page) {
    // clear storage, return to restricted page
    storage.clear()
    location = '/cgi-bin/koha/opac-restrictedpage.pl'
}
