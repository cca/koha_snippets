// https://library.cca.edu/cgi-bin/koha/opac-illrequests.pl?op=add_form&backend=Standard
// Ensure the SF branch is the only option for ILL requests
if (location.pathname.match('/cgi-bin/koha/opac-illrequests.pl')) {
    let branchInput = $('#branchcode')
    if (branchInput.length) {
        $('#branchcode').val('SF')
        $('#branchcode').attr('disabled', true)
    }
}
