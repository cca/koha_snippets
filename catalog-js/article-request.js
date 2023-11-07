if (path.match('/cgi-bin/koha/opac-request-article.pl')) {
    // SF is only valid pickup location for us so hide the pickup library menu,
    // remove the other options, & ensure SF is selected (it should be)
    $('#branchcode').parent().hide()
    $('option[value="OAK"], option[value="MATLIB"]').remove()
    $('option[value="SF"]').select()
}
