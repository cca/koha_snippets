// actions that require a login don't redirect back to the action post-CAS
// this script uses session storage to remember what's going on & redirect
// users back to the appropriate place for these actions:
// 1) back to opac-reserve.pl?biblionumber=N when placing hold
// 2) back to opac-suggestions.pl?op=add when making purchase suggestion
// 3) back to opac-request-article.pl?biblionumber(s)=N when requesting an article
// 4) back to opac-restrictedpage.pl (which doesn't require any parameter passing)
let onLoginScreen = !!$('#opac-login-page').length
    , search = new URLSearchParams(location.search)
    , bibs
    , bib
    // clear all sessionStorage entries like "cca_*"
    , clearCCAStorage = () => {
        for (let i = 0; i < sessionStorage.length; i++) {
            let key = sessionStorage.key(i)
            if (key.match(/^cca_/)) {
                sessionStorage.removeItem(key)
            }
        }
    }

// 1) record bib number when we're trying to place a hold but not logged in
if (onLoginScreen && path.match('/cgi-bin/koha/opac-reserve.pl')) {
    // we always clear storage first in case multiple actions build up
    // e.g. first they place hold, sign out, request article in same session
    clearCCAStorage()
    // URL structure is slightly different for multiple holds, biblionumbers
    // are listed in one parameter and forward-slash separated
    sessionStorage.setItem('cca_bib_hold', search.get('biblionumber'))
    sessionStorage.setItem('cca_bib_holds', search.get('biblionumbers'))
}
else if (path.match('/cgi-bin/koha/opac-user.pl') && (sessionStorage.getItem('cca_bib_hold') || sessionStorage.getItem('cca_bib_holds'))) {
    bib = sessionStorage.getItem('cca_bib_hold')
    bibs = sessionStorage.getItem('cca_bib_holds')
    // clear storage then go to appropriate reserve page
    sessionStorage.removeItem('cca_bib_hold')
    sessionStorage.removeItem('cca_bib_holds')
    // string "null" is stored if absent b/c storage can only hold strings
    if (bib && bib !== 'null') {
        location = '/cgi-bin/koha/opac-reserve.pl?biblionumber=' + bib
    } else if (bibs && bibs !== 'null') {
        location = '/cgi-bin/koha/opac-reserve.pl?biblionumbers=' + bibs
    }
}

// 2) we're trying to make a purchase suggestion but we're not logged in
// note we need to use location.href because we want to match query string too
if (onLoginScreen && location.href.match(/\/cgi-bin\/koha\/opac-suggestions.pl\?op=add/)) {
    clearCCAStorage()
    sessionStorage.setItem('cca_suggestion', true)
}
else if (path.match('/cgi-bin/koha/opac-user.pl') && sessionStorage.getItem('cca_suggestion')) {
    // clear storage, go to purchase suggestions form
    sessionStorage.removeItem('cca_suggestion')
    location = '/cgi-bin/koha/opac-suggestions.pl?op=add'
}

// 3) we're trying to make an article request but we're not logged in
if (onLoginScreen && path.match('/cgi-bin/koha/opac-request-article.pl')) {
    clearCCAStorage()
    sessionStorage.setItem('cca_article_request', search.get('biblionumber'))
}
else if (path.match('/cgi-bin/koha/opac-user.pl') && sessionStorage.getItem('cca_article_request')) {
    bib = sessionStorage.getItem('cca_article_request')
    // clear storage, go to appropriate article requests page
    sessionStorage.removeItem('cca_article_request')
    location = '/cgi-bin/koha/opac-request-article.pl?biblionumber=' + bib
}

// 4) we're trying to access the resticted page
if (onLoginScreen && path.match('/cgi-bin/koha/opac-restrictedpage.pl')) {
    clearCCAStorage()
    sessionStorage.setItem('cca_restricted_page', true)
}
else if (path.match('/cgi-bin/koha/opac-user.pl') && sessionStorage.getItem('cca_restricted_page')) {
    // clear storage, return to restricted page
    clearCCAStorage()
    location = '/cgi-bin/koha/opac-restrictedpage.pl'
}
