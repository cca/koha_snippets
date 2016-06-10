// redirect old Millennium ISBN queries (e.g. from website, external places)
// to Koha's new search URL structure
(function() { // wrap in IIFE

var path = location.pathname
// Millennium ISBN/ISSN search URLs look like
// http://library.cca.edu/search~S2/i?SEARCH=9781118903339
// so we check the path for similar
if (path.match(/\/search~S\d\/i/)) {
    var standard_no = location.search.split('=')[1]
    // put up a notice otherwise 404 page displays, a bit confusing
    document.body.innerHTML = '<h1>Redirecting your request...</h1>'
    // Redirect to Koha's equivalent URL
    // Koha ISBN search, idx=nb -> ISBN index, q is query param
    // NOTE: ISSN index is different (idx=ns) & the combined "standard number"
    // index idx=sn doesn't seem to work, so only ISBN redirects will work
    location.pathname = '/cgi-bin/koha/opac-search.pl?idx=nb&q=' + standard_no
}

})()
