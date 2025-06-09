// https://library.cca.edu/cgi-bin/koha/opac-illrequests.pl?op=add_form&backend=Standard
if (location.pathname.match('/cgi-bin/koha/opac-illrequests.pl')) {
    // Ensure SF branch is the only option for ILL requests
    let branchInput = $('#branchcode')
    if (branchInput.length) {
        $('#branchcode').val('SF')
        $('#branchcode').attr('disabled', true)
    }
    // Hide Custom Fields (no class on parent <fieldset>)
    $('#add-new-fields').parent().hide()
    // TODO hide unneeded metadata fields for different request types
}
