// modifications to the "main page" — page staff see right after logging in
if (location.pathname.match('/cgi-bin/koha/mainpage.pl') || location.pathname == "/") {
    $(()=> {
        // add new module buttons for pending article/purchase requests
        let $menu = $('.biglinks-list')
        $menu.eq(1)
            .append('<li><a class="icon_general icon_serials" href="/cgi-bin/koha/circ/article-requests.pl?branchcode="><i class="fa fa-fw fa-newspaper"></i>Article requests</a></li>')
            .append('<li><a class="icon_general icon_acquisitions" href="/cgi-bin/koha/suggestion/suggestion.pl?branchcode=__ANY__#ACCEPTED"><i class="fa fa-fw fa-gift"></i>Purchase Suggestions</a></li>')

        // if there are ILL requests with status = NEW, highlight the ILL module biglink
        // only run for staff who have ILL access (can see the biglink)
        const illBiglink = $('.biglinks-list .icon_ill')
        if (illBiglink.length) {
            fetch("/api/v1/ill/requests?_order_by=-requested_date")
                .then(response => response.json())
                .then(requests => {
                    const numNewRequests = requests.filter(r => r.status === "NEW").length
                    if (numNewRequests) {
                        illBiglink.css("font-weight", "bold").append('<span style="color: maroon;"> *</span>')

                        // add a link beside suggestions/article requests pending
                        const areaPending = $('#area-pending')
                        const newILLHTML = `<div class="pending-info" id="illrequests_pending">New ILL requests: <a href="/cgi-bin/koha/ill/ill-requests.pl"> <span class="pending-number-link">${numNewRequests}</span></a></div>`
                        if (areaPending.length) {
                            areaPending.append(newILLHTML)
                        } else {
                            // no good selector hooks
                            $('.row .col-sm-12').eq(0).append(`<div id="area-pending" class="page-section">${newILLHTML}</div>`)
                        }
                    }
                })
                .catch(e => {
                    console.error("Error fetching ILL requests from Koha REST API", e)
                })
        }
    })
}
