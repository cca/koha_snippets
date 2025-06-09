// actions that require a login don't redirect back to the action post-CAS
// this script uses session storage to remember what's going on & redirect
// users back to the appropriate place for these actions:
// Adding to a list: opac-addbybiblionumber.pl?biblionumber=N
// ILL request: opac-illrequests.pl?op=add_form
// Purchase suggestion: opac-suggestions.pl?op=add_form
// Hold: opac-reserve.pl?biblionumber=N
// Reporting a problem: opac-reportproblem.pl
// Requesting an article: opac-request-article.pl?biblionumber(s)=N
// Restricted page: opac-restrictedpage.pl
const onLoginScreen = !!$('#opac-login-page').length
    , STORAGE_KEY = 'cca_redirect'
    , redirect_paths = [ /^\/cgi-bin\/koha\/opac-addbybiblionumber\.pl/
        , /^\/cgi-bin\/koha\/opac-illrequests\.pl/
        , /^\/cgi-bin\/koha\/opac-suggestions\.pl/
        , /^\/cgi-bin\/koha\/opac-reserve\.pl/
        , /^\/cgi-bin\/koha\/opac-reportproblem\.pl/
        , /^\/cgi-bin\/koha\/opac-request-article\.pl/
        , /^\/cgi-bin\/koha\/opac-restrictedpage\.pl/
    ]

// We are on the login page but the path matches one of our redirects
if (onLoginScreen && redirect_paths.some(p => location.pathname.match(p))) {
    // Save the full URL of the page we're on
    sessionStorage.setItem(STORAGE_KEY, location.href)
} else if (location.pathname.match('/cgi-bin/koha/opac-user.pl') && sessionStorage.getItem(STORAGE_KEY)) {
    // Clear storage and go to the stored URL
    const href = sessionStorage.getItem(STORAGE_KEY)
    sessionStorage.removeItem(STORAGE_KEY)
    location = href
}
