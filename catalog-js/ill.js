// https://library.cca.edu/cgi-bin/koha/opac-illrequests.pl?op=add_form&backend=Standard
if (location.pathname.match('/cgi-bin/koha/opac-illrequests.pl')) {
    // Ensure SF branch is the only option for ILL requests
    let branchInput = $('#branchcode')
    if (branchInput.length) {
        $('#branchcode').val('SF')
        $('#branchcode').attr('disabled', true)
    }

    // Remove "Other" from the Type dropdown b/c it has no fields
    $('#type').find('option[value="other"]').remove()

    // Hide Custom Fields (no class on parent <fieldset>)
    $('#add-new-fields').parent().hide();

    // Required fields
    ['article_author'
        , 'article_title'
        , 'author'
        , 'chapter'
        , 'chapter_author'
        , 'paper_author'
        , 'paper_title'
        , 'title']
        .forEach(field => {
            $(`label[for="${field}"]`).addClass('required')
            $(`input[name="${field}"]`).attr('required', true).addClass('required')
        })

    // TODO hide unneeded metadata fields for different request types
}
