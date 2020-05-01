// user's "summary" page immediately after logging in
if (path.match('/cgi-bin/koha/opac-user.pl')) {
    // edit (On hold) text in the "Renew" column to indicate a recall & make more prominent
    $('.renew .renewals:contains("(On hold)")')
        .css('font-weight', 'bold').text('Item recalled - please return')
        .parent('td').addClass('overdue').css('background-color', '#f8e86c')

    // link to our contact form in these notices
    $('#warnexpired, #warndeparture').each((idx, el) => {
        let $el = $(el)
        let html = $el.html()
        let replacement = '<a href="https://libraries.cca.edu/about-us/about-us/ask-a-librarian/">contact the library</a>'
        $el.html(html.replace('contact the library', replacement))
    })

    let showMessage = () => {
        // BUG #23968 OPACMySummaryNote does not display, fixed in 19.11
        if (!$('#opac-my-summary-note').length) {
            let url = 'http://libraries.cca.edu/news/information-regarding-libraries-during-suspension-person-classes'
            // COVID-19 note
            let note = `<h3>Library services during suspension of in-person classes</h3>
            <p>CCA campuses, including the Libraries, are closed until further notice. Due dates have been extended for most items, and patrons will not receive late fees during the campus closures. For more information and access to our online teaching and learning resources, please <a onclick="return ga('send', 'event', 'OPACMySummaryNote', 'blog post link', this.href);" href="${url}">see The Libraries' blog</a>.</p>`
            // if there's already an alert, prepend this to it, otherwise create an alert
            if ($('.alert').not('#notesaved').length) {
                $('.alert').not('#notesaved').eq(0).prepend(note)
            } else {
                $('#notesaved').before(`<div class="alert alert-warning">${note}</div>`)
            }
        }
    }
    // show for everyone
    showMessage()

    // // show note only if user is a student, get patron type via public report
    // let id = $('.loggedinusername').data('borrowernumber')
    // if (id && fetch) {
    //     let report = 'https://library.cca.edu/cgi-bin/koha/svc/report?id=353'
    //     fetch(`${report}&sql_params=${id}`)
    //         .then(resp => resp.json())
    //         .then(data => {
    //             // response is always an array of arrays: [ [ "ALUMNI" ] ]
    //             let category = data[0][0]
    //             if (category == 'UNDERGRAD' || category == 'GRAD') showMessage()
    //         })
    //         .catch((e) => console.error(e))
    // } else {
    //     // default to showing the message
    //     showMessage()
    // }
}
