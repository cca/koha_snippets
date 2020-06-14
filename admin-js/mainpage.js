// modifications to the "main page" — page staff see right after logging in
if (path.match('/cgi-bin/koha/mainpage.pl')) {
    $(function(){
        let suggestions = $('#suggestions_pending a')

        // make article requests link go to _all_ libraries
        $('#article_requests_pending a').attr('href', (i, href) => {
            return href + '?branchcode='
        })

        // same with acquisitions requests, make them show all libraries
        suggestions.attr('href', (i, href) => {
            return href.replace('#ASKED', '?displayby=STATUS&branchcode=__ANY__#ASKED')
        })

        // add new module buttons for pending article/purchase requests
        $('.biglinks-list').eq(0).append(`<li>
                <a class="icon_general icon_serials"
                    href="/cgi-bin/koha/circ/article-requests.pl?branchcode=">
                    <i class="fa fa-newspaper-o"></i>
                        Article requests
                </a>
            </li>`)
        if (suggestions.length) {
            $('.biglinks-list').eq(1).append(`<li>
                <a class="icon_general icon_acquisitions"
                    href="${suggestions.attr('href')}">
                    <i class="fa fa-gift"></i>
                        ${suggestions.text()}
                </a>
            </li>`)
        }
    })
}
