// "place a hold" page, accessible from multiple places
if (path.match('/cgi-bin/koha/reserve/request.pl')) {
    // uncheck "hold next avail. item" on holds page
    // we don't want people placing bib-level holds by accident
    $('#requestany').prop('checked', false)
}
