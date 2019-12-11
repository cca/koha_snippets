// user's "summary" page immediately after logging in
if (path.match('/cgi-bin/koha/opac-user.pl')) {
    // edit (On hold) text in the "Renew" column to indicate a recall & make more prominent
    $('.renew .renewals:contains("(On hold)")')
        .css('font-weight', 'bold').text('Item recalled - please return')
        .parent('td').addClass('overdue').css('background-color', '#f8e86c')

    let showMessage = () => {
        // BUG #23968 OPACMySummaryNote does not display, fixed in 19.11
        if (!$('#opac-my-summary-note').length) {
            let note = `<div class="alert alert-warning">
            <h3>Students: Important End-of-Semester Information</h3>
            <p>Undergraduate and graduate students cannot borrow or renew items past Dec 13 until they have updated their accounts in-person at either campus library. See <a onclick="return ga('send', 'event', 'OPACMySummaryNote', 'blog post link', this.href);" href="https://libraries.cca.edu/news/winter-break-2019-checkouts-and-hours/">the libraries' blog</a> for information on how to update your account, borrowing over winter break, and our complete winter hours.</p>
            </div>`
            $('#notesaved').after(note)
        }
    }

    // show note only if user is a student, get patron type via public report
    let id = $('.loggedinusername').data('borrowernumber')
    if (id && fetch) {
        let report = 'https://library.cca.edu/cgi-bin/koha/svc/report?id=353'
        fetch(`${report}&sql_params=${id}`)
            .then((resp) => resp.json())
            .then((data) => {
                // response is always an array of arrays: [ [ "ALUMNI" ] ]
                let category = data[0][0]
                if (category == 'UNDERGRAD' || category == 'GRAD') showMessage()
            })
            .catch((e) => console.error(e))
    } else {
        // default to showing the message
        showMessage()
    }
}
