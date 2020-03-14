// Bug #20334, fixed in 19.11 - amazingly, we moved to Elasticsearch before
// searches escaped "/" so those all break now. Try to catch as many as we can.
if (path.match('/cgi-bin/koha/opac-search.pl') || path.match('/cgi-bin/koha/opac-main.pl')) {
    // this looks so complicated because we don't want to escape an already-
    // escaped slash a second time
    let escapeSlash = (i, str) => str.replace(/([^\\])(\/)/, '$1\\/')
    $('form').submit(function(ev) {
        $(this).find('input[name="q"]').val(escapeSlash)
    })
}
