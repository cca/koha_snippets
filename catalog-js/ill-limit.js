if (location.pathname.match('/cgi-bin/koha/opac-illrequests.pl')) {
    const params = new URLSearchParams(location.search)

    if (!$('#ill-new').length && !params.get('op')) {
        // No "create a new request" button, show a note that only students can ILL
        $('.maincontent h1')
            .eq(0)
            .after(
                "<p class='alert alert-warning'>Due to staffing shortages, we limit inter-library loan requests to current CCA students. If you are a faculty or staff member, we recommend using your local public library's inter-library loan services instead. If you need help locating a resource, <a class='alert-link' href='https://libraries.cca.edu/about-us/about-us/ask-a-librarian/'>the librarians are here to help</a>.</p>"
            )
    } else {
        // Enforce 3 ILLs in 3-month period limit
        const patronId = $('.loggedinusername').data('borrowernumber')
        const limit = 3
        // Disable ILL & add an alert about the limit having been reached
        const overLimit = () => {
            $("#ill-new, #ill-submit").prop("disabled", true).addClass("disabled")
            $(".maincontent h1")
                .eq(0)
                .after(
                    "<div class='alert alert-warning'><h2 class='alert-heading'>ILL Request Limit Reached</h2><p>Due to staffing shortages, we limit inter-library loan requests to 3 per patron within a 3-month period. You have reached that limit. We recommend using your local public library's inter-library loan services instead. If you need help locating a resource, <a class='alert-link' href='https://libraries.cca.edu/about-us/about-us/ask-a-librarian/'>the librarians are here to help</a>.</p></div>"
                )
        }

        if (patronId) {
            // other parameters: _page, _match=contains, could also order by illrequest_id descending
            // https://library-staff.cca.edu/api/v1/.html#op-get--public-patrons--patron_id--ill-requests
            // we only need to check the first three and see if they're < a semester (three months) old
            fetch(
                `/api/v1/public/patrons/${patronId}/ill/requests?_per_page=${limit}&_order_by=-me.requested_date`,
            )
                .then(resp => resp.json())
                .then(requests => {
                    let threeMonthsAgo = new Date()
                    threeMonthsAgo = new Date(threeMonthsAgo.setMonth(
                    threeMonthsAgo.getMonth() - 3,
                    ))
                    let recentRequests = requests.filter(req => new Date(req.requested_date) > threeMonthsAgo)
                    console.debug(`Patron ${patronId} has ${recentRequests.length} recent requests of last ${requests.length} ILL requests.`)
                    if (recentRequests.length >= limit) overLimit()
                })
                .catch(err => {
                    console.error("ill-limit.js: error fetching ILL requests.", err)
                })
        } else {
            console.error("ill-limit.js: could not find logged-in patron ID.")
        }
    }
}
