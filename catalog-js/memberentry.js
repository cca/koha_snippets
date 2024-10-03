// "Your personal details" user account page
if (location.pathname.match('/cgi-bin/koha/opac-memberentry.pl')) {
    // only allow SF to be home branch
    $('#borrower_branchcode option[value="SF"]').prop('selected', true)
    $('#borrower_branchcode').prop('disabled', true)
    // we do not show "other phone" (mobile) or fax to patrons
    // so we remove them from the "main contact method" dropdown
    $('#borrower_primary_contact_method').find('option[value="mobile"], option[value="fax"]').remove()
    // patron names come from Workday, so we don't want them to be editable
    $('#borrower_surname, #borrower_firstname').prop('disabled', true).prop('title', 'Update your preferred name in Workday.')
}
