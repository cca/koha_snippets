// action that require a login don't redirect back to the action post-CAS
// this script uses session storage to remember what's going on & redirect
// users back to the appropriate place for 2 actions:
// 1) back to opac-reserve.pl?biblionumber=N when placing hold
// 2) back to opac-suggestions.pl?op=add when making purchase suggestion

// this is a little weird: we assume we're on the login screen if we see the
// <!-- TEMPLATE FILE: opac-auth.tt --> comment which is a child only of the
// document (not even <html> element)
var onLoginScreen = !!document.childNodes[1].textContent.match('opac-auth.tt')

// 1) record bib number when we're trying to place a hold but not logged in
if (onLoginScreen && location.pathname.match('/cgi-bin/koha/opac-reserve.pl')) {
    var bib = location.search.match(/biblionumber=(\d+)/)[1]
    sessionStorage.setItem('cca_bib_hold', bib)
}
if (location.pathname.match('/cgi-bin/koha/opac-user.pl') && sessionStorage.cca_bib_hold) {
    var bib = sessionStorage.cca_bib_hold
    // clear storage, go to appropriate reserve page
    sessionStorage.removeItem('cca_bib_hold')
    location = '/cgi-bin/koha/opac-reserve.pl?biblionumber=' + bib
}

// 2) note that we're trying to make a purchase suggestion but we're not logged in
// note we need to use href because we want to match query string too
if (onLoginScreen && location.href.match(/\/cgi-bin\/koha\/opac-suggestions.pl\?op=add/)) {
    sessionStorage.setItem('cca_suggestion', true)
}
if (location.pathname.match('/cgi-bin/koha/opac-user.pl') && sessionStorage.cca_suggestion) {
    // clear storage, go to purchase suggestions form
    sessionStorage.removeItem('cca_suggestion')
    location = '/cgi-bin/koha/opac-suggestions.pl?op=add'
}
