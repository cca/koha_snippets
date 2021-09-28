// better home page column layout, simpler search form

// run only on home pg (could be at domain root or its own path)
if (path.match('cgi-bin/koha/opac-main.pl') || path === '/') {
    // we want no form controls over than text input & search button
    // we hide most with CSS but the library branch selector has a parent
    // element with only layout classes so it's easier to remove with JS
    $('#select_library').parent().remove()
    $('#translControl1').addClass('form-control-lg')
    $('#searchform').find('div').first().addClass('input-group')
}
