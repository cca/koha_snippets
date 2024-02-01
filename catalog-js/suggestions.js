// purchase suggestions form
if (location.href.indexOf('/cgi-bin/koha/opac-suggestions.pl?op=add') !== -1) {
    // SF (default) is only valid branch selection so hide this menu
    $('#branch').parent('li').hide()
}
