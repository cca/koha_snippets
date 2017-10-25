// on specific searches for the Artists' Books collection, show a link to the
// previews in VAULT
if (location.pathname.match('/cgi-bin/koha/opac-search.pl')) {
    var qs = new URLSearchParams(location.search)
    var q = qs.get('q')

    // we have direct links that match these queries
    if (q && (q.match('artists books collection') || q.match("Artists' books collection"))) {
        // insert an alert about the artists' books in VAULT
        var html = '<div class="alert alert-error">View previews of the Artists\' Books Collection <a href="https://vault.cca.edu/logon.do?.page=/hierarchy.do?topic=a7b976d5-5316-44da-b06e-7374cd100075">in VAULT</a> (signin required).</div>'
        $('#numresults').before(html)
    }
}
