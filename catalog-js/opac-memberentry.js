// "Your personal details" user account page
if (path.match('/cgi-bin/koha/opac-memberentry.pl')) {
    // only allow SF to be home branch
    $('#borrower_branchcode option[value="SF"]').prop('selected', true)
    $('#borrower_branchcode').prop('disabled', true)
    // we do not show "other phone" (mobile) or fax to patrons
    // so we remove them from the "main contact method" dropdown
    $('#borrower_primary_contact_method').find('option[value="mobile"], option[value="fax"]').remove()
}
