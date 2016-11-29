// redirect user back to opac-reserve.pl?biblionumber=N after they've logged in
// requires two parts:
// 1) record bib number in storage when we're on opac-reserve but not logged in
if (location.pathname.match('/cgi-bin/koha/opac-reserve.pl')) {
    var bib = location.search.match(/biblionumber=(\d+)/)[1]
    sessionStorage.setItem('cca_bib_hold', bib)
}
// 2) redirect a user landing on opac-user.pl when the cookie is present
if (location.pathname.match('/cgi-bin/koha/opac-user.pl') && sessionStorage.cca_bib_hold) {
    var bib = sessionStorage.cca_bib_hold
    // remove cookie, go to appropriate reserve page
    sessionStorage.removeItem('cca_bib_hold')
    location = '/cgi-bin/koha/opac-reserve.pl?biblionumber=' + bib
}
