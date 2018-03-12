// modifications to editing/adding patrons forms (under the cgi-bin/koha/members path)
if (location.pathname.match('/cgi-bin/koha/members/memberentry.pl')) {
$(()=>{

    // add University ID patron attribute to the "quick add" form
    // copied from existing form, changed IDs so they're unique (added "_qa")
    let html = `<li>
                    <label for="patron_attr_3_qa">University ID: </label>
                    <input type="text" size="20" id="patron_attr_3_qa" name="patron_attr_3">
                    <input type="hidden" id="patron_attr_3_code_qa" name="patron_attr_3_code" value="UNIVID" class="noEnterSubmit">
                </li>`
    $('#quick_add_list').append(html)

    // make University ID required for the patron categories below
    let types = ['FACULTY', 'GRAD', 'STAFF', 'UNDERGRAD']
    let type = new URLSearchParams(location.search).get('categorycode')
    if (types.includes(type)) {
        // also target the quick add form input we just added above
        $('label[for="patron_attr_3"], label[for="patron_attr_3_qa"]').addClass('required')
        $('#patron_attr_3, #patron_attr_3_qa').prop('required', true)
            .addClass('noEnterSubmit')
            .after('<span class="required">Required</span>')
    }

})
}
