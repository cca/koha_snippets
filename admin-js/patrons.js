// modifications to editing/adding patrons forms (under the cgi-bin/koha/members path)
if (location.pathname.match('/cgi-bin/koha/members/memberentry.pl')) {
    $(() => {
        // make University ID required for the patron categories below
        let types = ['FACULTY', 'GRAD', 'STAFF', 'UNDERGRAD']
        let type = new URLSearchParams(location.search).get('categorycode')
        if (types.includes(type)) {
            $('label[for="patron_attr_3"]').addClass('required')
            $('#patron_attr_3').prop('required', true)
                .addClass('noEnterSubmit')
                .after('<span class="required">Required</span>')
        }
    })
}
