// https://library.cca.edu/cgi-bin/koha/opac-illrequests.pl?op=add_form&backend=Standard
if (location.pathname.match('/cgi-bin/koha/opac-illrequests.pl')) {
    const params = new URLSearchParams(location.search)

    // ! Disable ILL during Paul's paternity leave 2026-04-28 to Fall 2026
    $("#ill-new, #ill-submit").prop("disabled", true).addClass("disabled")
    $(".maincontent h1")
      .eq(0)
      .after(
        "<div class='alert alert-warning'><h2 class='alert-heading'>ILL Temporarily Unavailable</h2><p>Due to staffing shortages, we will be unable to offer inter-library loan until Fall 2026. We recommend using your local public library's inter-library loan facilities instead. If you need help locating a resource, <a class='alert-link' href='https://libraries.cca.edu/about-us/about-us/ask-a-librarian/'>the librarians are here to help</a>.</p></div>"
    )
    // ! END disable ILL, remove this when it returns

    if (params.get('op') === 'add_form') {
        // Auto-select SF branch, do not disable <select> or the value won't submit with the form
        $('#branchcode option[value="SF"]').attr('selected', true)

        // We do not fulfill "Journal", "Conference", or "Other" (has no fields)
        // type requests so we remove them all from the dropdown menu
        $('#type').find('option[value="conference"], option[value="journal"], option[value="other"]').remove()

        // Hide Custom Fields (no class on parent <fieldset>)
        $('#add-new-fields').parent().hide();

        // Required fields
        ['article_author'
            , 'article_title'
            , 'author'
            , 'chapter'
            , 'paper_author'
            , 'paper_title'
            , 'title']
            .forEach(field => {
                $(`label[for="${field}"]`).addClass('required')
                $(`input[name="${field}"]`).attr('required', true).addClass('required')
            })
    }

    // change DOI label to "DOI / Link
    $('label:contains(DOI:)').text("DOI / Link:") // add form
    $('.requestattr-DOI .label').text("DOI / Link:") // view details
}
