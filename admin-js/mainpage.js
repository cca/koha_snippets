// modifications to the "main page" — page staff see right after logging in
if (location.pathname.match('/cgi-bin/koha/mainpage.pl')) {
    $(function(){
        let article_requests = $('#article_requests_pending a')
        let suggestions_pending = $('#suggestions_pending a')

        // make article requests link go to _all_ libraries
        article_requests.attr('href', (i, href) => {
            return href + '?branchcode='
        })

        // same with acquisitions requests, make them show all libraries
        suggestions_pending.attr('href', (i, href) => {
            return href.replace('#ASKED', '?displayby=STATUS&branchcode=__ANY__#ASKED')
        })

        // add new module buttons for pending article/purchase requests
        let html = ''
        if (article_requests.length) {
            html += `<li>
                <a class="icon_general icon_serials"
                    href="${article_requests.attr('href')}">'
                        ${article_requests.text()}
                </a>
            </li>`
        }
        if (suggestions_pending.length) {
            html += `<li>
                <a class="icon_general icon_acquisitions"
                    href="${suggestions_pending.attr('href')}">
                        ${suggestions_pending.text()}
                </a>
            </li>`
        }
        $('.biglinks-list').eq(1).append(html)
    })
}
