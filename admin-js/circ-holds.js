// uncheck "place a hold on next avail. item" on holds page
// we don't want people placing bib-level holds by accident
if (path.match('/cgi-bin/koha/reserve/request.pl')) {
    $(function(){
        $('#requestany').prop('checked', false)
    })
}
