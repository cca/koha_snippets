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
        let replacement = '<a href="https://docs.google.com/forms/d/e/1FAIpQLSc1-K0wNRPZOCbM3s3iCUiHql8CR4y5E9Cc79qIOS5xDC6XOg/viewform?usp=sf_link">contact the library</a>'
        $el.html(html.replace('contact the library', replacement))
    })

    // // show OPACMySummaryNote _only if user is a student_
    // // we get their patron type via a public report
    // let id = $('.loggedinusername').data('borrowernumber')
    // if (id && fetch) {
    //     let report = 'https://library.cca.edu/cgi-bin/koha/svc/report?id=353'
    //     fetch(`${report}&sql_params=${id}`)
    //         .then(resp => resp.json())
    //         .then(data => {
    //             // report responses are arrays of arrays: [ [ "ALUMNI" ] ]
    //             let category = data[0][0]
    //             if (category != 'UNDERGRAD' && category != 'GRAD') {
    //                 return $('#opac-my-summary-note').remove()
    //             }
    //         })
    //         .catch((e) => console.error(e))
    // }
}
