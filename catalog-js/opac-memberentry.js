// "Your personal details" user account page
if (path.match('/cgi-bin/koha/opac-memberentry.pl')) {
    // only allow SF to be home branch
    $('#borrower_branchcode option[value="SF"]').prop('selected', true)
    $('#borrower_branchcode').prop('disabled', true)
}