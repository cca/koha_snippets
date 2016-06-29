// redirect old Millennium ISBN queries (e.g. from website, external places)
// to Koha's new search URL structure
(function() {

function redir(path) {
    // put up a notice otherwise 404 page displays, a bit confusing
    document.body.innerHTML = '<h1>Redirecting your request...</h1>'
    // go to new location
    location = path
}

// Millennium ISBN/ISSN search URLs look like
// http://library.cca.edu/search~S2/i?SEARCH=9781118903339
// so we check the path for similar
if (location.pathname.match(/\/search~S\d\/i/)) {
    var standard_no = location.search.split('=')[1]
    // Redirect to Koha's equivalent URL
    // Koha ISBN search, idx=nb -> ISBN index, q is query param
    // NOTE: ISSN index is different (idx=ns) & the combined "standard number"
    // index idx=sn doesn't seem to work, so only ISBN redirects will work
    redir('/cgi-bin/koha/opac-search.pl?idx=nb&q=' + standard_no)

    // Millennium keyword type searches
} else if (location.toString().match(/\/search~S\d\?\/Y/i)) {
    var kw = location.search.split('?/Y')[1].split('&')[0]
    // redirect to Koha keyword search, idx=kw
    redir('/cgi-bin/koha/opac-search.pl?idx=kw,wrdl&q=' + kw)
}

})()
