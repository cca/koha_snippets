// redirect old Millennium ISBN queries (e.g. from website, external places)
// to Koha's new search URL structure
// for details on Millennium search URL structure, see
// http://csdirect.iii.com/manual_2009b/rmil_command_links.html
(function() {

function getQuery () {
    var url = location.toString()

    // if we have etiher a "searcharg" or "SEARCH" query param, take it
    if (url.match('searcharg')) {
        return url.split('searcharg=')[1].split('&')[0]
    } else if (url.match('SEARCH')) {
        return url.split('SEARCH=')[1].split('&')[0]
    } else {
        // for URLs lacking a param, we look for the /d /a etc. index indicators
        // & take whatever comes after them
        // e.g. /search/aPhetteplace -> Phetteplace
        // but work around the optional "~S2" scope parameter
        return url.split(/\/search(~S\d\??)?\/\w/)[2].split(/\/\w/)[0]
    }
}

function redir (path) {
    // put up a notice otherwise 404 page displays, a bit confusing
    document.body.innerHTML = '<h1>Redirecting your request...</h1>'
    // go to new location
    location = path
}

// Millennium ISBN/ISSN search URLs look like
// /search~S2/i?SEARCH=9781118903339
// so we check the path for similar
if (location.pathname.match(/\/search(~S\d\??)?\/i/)) {
    var standard_no = getQuery()
    // Redirect to Koha's equivalent URL
    // Koha ISBN search, idx=nb -> ISBN index, q is query param
    // NOTE: ISSN index is different (idx=ns) & the combined "standard number"
    // index idx=sn doesn't seem to work, so we fork based on number length
    if (standard_no.length === 9) {
        // ISSN
        redir('/cgi-bin/koha/opac-search.pl?idx=ns&q=' + standard_no)
    } else { // default to ISBN
        redir('/cgi-bin/koha/opac-search.pl?idx=nb&q=' + standard_no)
    }
    // Millennium keyword type searches
} else if (location.toString().match(/\/search(~S\d\??)?\/(Y|X|w)/)) {
    var kw = getQuery()
    kw && redir('/cgi-bin/koha/opac-search.pl?q=' + kw)

    // Millennium subject searches
    // URL like /search~S1?/dteaching/dteaching/1%2C8%2C11%2CB/exact&FF=dteaching&1%2C4%2C
} else if (location.toString().match(/\/search(~S\d\??)?\/d/)) {
    var subj = getQuery()
    // redirect to Koha subject search, looks like q=(su:{Subject Term})
    subj && redir('/cgi-bin/koha/opac-search.pl?q=(su:%7B' + subj + '%7D)')

    // Millennium author searches
} else if (location.toString().match(/\/search(~S\d\??)?\/a/)) {
    var author = getQuery()
    // redirect to Koha author search, looks like q=(au:{Author Name})
    author && redir('/cgi-bin/koha/opac-search.pl?q=(au:%7B' + author + '%7D)')

    // Millennium title searches
} else if (location.toString().match(/\/search(~S\d\??)?\/t/)) {
    var title = getQuery()
    // redirect to Koha title search, looks like q=(ti:{Title of Work})
    title && redir('/cgi-bin/koha/opac-search.pl?q=(ti:%7B' + title + '%7D)')

    // Millennium patron login page
} else if (location.pathname.match('/patroninfo')) {
    redir('/cgi-bin/koha/opac-user.pl')
}

})()
